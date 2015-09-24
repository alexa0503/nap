<?php
namespace AppBundle\Controller;

use AppBundle\Wechat;
use Imagine\Gd\Imagine;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\Config\Definition\Exception\Exception;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use AppBundle\Helper;
use AppBundle\Entity;
use Symfony\Component\Validator\Constraints\DateTime;

#use Symfony\Component\Validator\Constraints\Image;

class DefaultController extends Controller
{
	/**
	 * @Route("/", name="_index")
	 */
	public function indexAction()
	{
		return $this->redirect('index.html');
		//return $this->render('AppBundle:default:index.html.twig');
	}
	/**
	 * @Route("/sign", name="_sign")
	 */
	public function signAction(Request $request)
	{
		if( null == $request->get('url')){
			return new Response('');
		}
		//$url = urldecode($request->get('url'));
		$appId = $this->container->getParameter('wechat_appid');
		$appSecret = $this->container->getParameter('wechat_secret');
		$wechat = new Wechat\Wechat($appId, $appSecret);
		$wx = (array)$wechat->getSignPackage(urldecode($request->get('url')));
		//var_dump($wx);
		$wx['shareTitle'] = '你有一个来自 NET-A-PORTER 颇特女士的下午茶邀请';
		$wx['shareDesc'] = '邀请全城摩登客开启一段舌尖与视觉碰撞的时尚之旅';
		$wx['shareUrl'] = 'http://'.$request->getHost().'/';
		$wx['imgUrl'] = 'http://'.$request->getHost().'/images/share.jpg';
		return new Response(json_encode($wx));
	}
	/**
	 * @Route("/post", name="_post")
	 */
	public function postAction(Request $request)
	{
		$return = array(
			'ret' => 0,
			'msg' => '',
			);
		$session = $request->getSession();
		if( $request->getMethod() == "POST"){
			$em = $this->getDoctrine()->getEntityManager();
			$repo = $em->getRepository('AppBundle:Info');
			$qb = $repo->createQueryBuilder('a');
			$qb->select('COUNT(a)');
			$qb->where('a.mobile = :mobile');
			$qb->setParameter('mobile', $request->get('mobile'));
			$count = $qb->getQuery()->getSingleScalarResult();
			if($count > 0){
				$return['ret'] = 1200;
				$return['msg'] = '该手机号已经提交过信息啦';
			}
			elseif( null == $request->get('email')){
				$return['ret'] = 1002;
				$return['msg'] = 'Email不能为空';
			}
			elseif( !filter_var($request->get('email'), FILTER_VALIDATE_EMAIL)){
				$return['ret'] = 1003;
				$return['msg'] = 'Email不正确';
			}
			elseif( null == $request->get('mobile')){
				$return['ret'] = 1004;
				$return['msg'] = '手机不能为空';
			}
			elseif ( !preg_match("/^1\d{10}$/", $request->get('mobile')) ){
				$return['ret'] = 1005;
				$return['msg'] = '手机不正确';
			}
			else{
				$info = new Entity\Info;
				$info->setEmail($request->get('email'));
				$info->setMobile($request->get('mobile'));
				$info->setCreateIp($request->getClientIp());
				$info->setCreateTime(new \DateTime('now'));
				$em->persist($info);
				$em->flush();
			}
		}
		else{
			$return['ret'] = 1100;
			$return['msg'] = '来源不正确~';
		}
		return new Response(json_encode($return));
	}
}

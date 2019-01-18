<?php

defined('BASEPATH') OR exit('No direct script access allowed');
require(APPPATH . 'libraries/REST_Controller.php');
/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of Common
 *
 * @author Ahmad Mahmoud
 */
class Common extends REST_Controller {

    public function __construct() {
        parent::__construct(FALSE);
    }
    
    public function agreement(){
        $os_qs = $this->input->get('os');
        if($os_qs == OS_IOS || $os_qs == OS_ANDROID){
            $os = $os_qs;
        }else{
            $this->failed(MSG_PARAM_INVALID);
        }
        if($os == OS_IOS){
            $font = 'font-family:-apple-system, "Helvetica Neue", "Lucida Grande";';
            $link = '';
        }else{
            $font = 'font-family:"Roboto", sans-serif';
            $link = '<link href="https://fonts.googleapis.com/css?family=Roboto" rel="stylesheet" type="text/css" />';   
        }
        $result = $this->CommonModel->getAgreement();
        if(!$result){
            $this->failed(MSG_AGREEMENT_NOTFOUND);
        }
        $html = '<!DOCTYPE html>
        <html>
            <meta name="viewport" content="user-scalable=no, width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1, target-densityDpi=device-dpi" />
            <head>'.$link.'
                <style type="text/css">
                .base{color:#767879;font-size:11pt;'.$font.'}
                .container{margin:20px}
                </style>
                <title>'.$result->title.'</title>
            </head>
            <body class="base">
                <div class="container">
                    <h2>'.$result->title.'</h2>'.$result->content.'
                </div>
            </body>
        </html>';
	echo $html;
        exit;
    }

}

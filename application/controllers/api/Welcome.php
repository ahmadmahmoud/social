<?php
defined('BASEPATH') OR exit('No direct script access allowed');
require(APPPATH . 'libraries/REST_Controller.php');
/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of Welcome
 *
 * @author pslpt189
 */
class Welcome extends REST_Controller {
    public function index() {
        
        $causestypes = $this->CommonModel->getReportCauses();
        $socialmedia = $this->PublicModel->getSocialMediaTypes();
        $admobs = $this->PublicModel->geAdMobs();
        $settings = $this->PublicModel->getSettings();
        unset($settings->maxpostcount);
        unset($settings->certificate);
        unset($settings->gcmkey);
        unset($settings->passphrase);
        unset($settings->logo);
        unset($settings->maxnotifications);
        unset($settings->maxmessages);
        $data = array(
            'mediatypes' => $socialmedia,
            'reporttypes' => $causestypes,
            'admobs' => $admobs,
            'settings' => $settings
        );
        $this->success("", array(), $data);
    }
}

<?php
defined('BASEPATH') OR exit('No direct script access allowed');
require(APPPATH . 'libraries/REST_Controller.php');
/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of Notifications
 *
 * @author Ahmad Mahmoud
 * 
 */
class Notifications extends REST_Controller {

    public function __construct() {
        parent::__construct(TRUE);
    }
    
    public function index() {
        $get = array('page' => $this->input->get('page'));
        $this->form_validation->set_data($get);
        $this->form_validation->set_rules('page', 'Page', 'trim|required|integer|is_natural_no_zero|min_length[1]');
        if ($this->form_validation->run() == FALSE) {
            $errors = $this->form_validation->error_array();
            if (isset($errors['page'])) {
                $this->failed(MSG_PAGE_REQUIRED);
            }
        }
        $page = $this->input->get('page');
        $user_id = $this->user->id;
        $data = $this->NotificationsModel->getNotifications($user_id, $page);
        $count = $data['count'];
        $total = $data['total'];
        $pages = "1";
        if($total >= NOTIFICATIONS_LIMIT){
            $pages = strval(ceil($total/NOTIFICATIONS_LIMIT));
        }
        $meta = new stdClass();
        $meta->page = $page;
        $meta->limit = strval(NOTIFICATIONS_LIMIT);
        $meta->count = strval($count);
        $meta->total = strval($data['total']);
        $meta->pages = $pages;
        $device = $this->user->device;
        $admob = $this->CommonModel->getAdMob($device, 'notifications');
        $output = array(
            'notifications' => $data['result'],
            'admob' => (isset($admob) && $admob->admob) ? $admob->admob : ""
        );
        $this->success("", $meta, $output);   
    }
    
}

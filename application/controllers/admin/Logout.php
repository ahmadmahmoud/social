<?php

defined('BASEPATH') OR exit('No direct script access allowed');

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of Logout
 *
 * @author Ahmad Mahmoud
 */
class Logout extends CI_Controller {

    public function __construct() {
        parent::__construct();
    }

    public function index() {
        if (!$this->session->has_userdata('admin')) {
            redirect(base_url(), 'refresh');
        }
        delete_cookie(ADMIN_COOKIENAME);
        $this->session->unset_userdata('admin');
        redirect(base_url() . 'admin', 'refresh');
    }

}

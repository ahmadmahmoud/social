<?php

defined('BASEPATH') OR exit('No direct script access allowed');
/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of Settings
 *
 * @author Ahmad Mahmoud
 */
class Settings extends CI_Controller {

    public function __construct() {
        parent::__construct();
        if (!$this->session->has_userdata('admin')) {
            redirect($this->config->item('admin_url'), 'refresh');
        }
    }

    public function index() {
        $result = $this->AdminModel->getSettings();
        $data = array(
            'view' => 'admin/settings',
            'settings' => $result
        );
        $this->load->view('layouts/admin', $data);
    }

    public function update() {
        $response = array('success' => FALSE, 'msg' => '');
        if (!$this->AdminModel->verifyRequest()) {
            $response['msg'] = "Invalid Request!";
            echo json_encode($response);
            exit;
        }
        $post = $this->input->post();
        $this->form_validation->set_data($post);
        $this->form_validation->set_rules('allow_post', 'Allow Post', 'trim|required|integer|min_length[1]');
        $this->form_validation->set_rules('allow_comment', 'Allow Comment', 'trim|required|integer|min_length[1]');
        $this->form_validation->set_rules('allow_forsale', 'Allow Forsale', 'trim|required|integer|min_length[1]');
        $this->form_validation->set_rules('timezone', 'Timezone', 'trim|required|min_length[1]');
        if ($this->form_validation->run() == FALSE) {
            $response['msg'] = "Invalid Request!";
            echo json_encode($response);
            exit;
        }
        $allow_post = $this->input->post('allow_post');
        $allow_comment = $this->input->post('allow_comment');
        $allow_forsale = $this->input->post('allow_forsale');
        $timezone = $this->input->post('timezone');

        $fields = array(
            'allow_post' => $allow_post,
            'allow_comment' => $allow_comment,
            'allow_forsale' => $allow_forsale,
            'timezone' => $timezone
        );
        $this->db->update('settings', $fields);
        $response['success'] = TRUE;
        echo json_encode($response);
        exit;
    }

    public function password() {
        $response = array('success' => FALSE, 'msg' => '');
        if (!$this->AdminModel->verifyRequest()) {
            $response['msg'] = "Invalid Request!";
            echo json_encode($response);
            exit;
        }
        $post = $this->input->post();
        $this->form_validation->set_data($post);
        $this->form_validation->set_rules('curpwd', 'Current Password', 'trim|required|min_length[5]');
        $this->form_validation->set_rules('newpwd', 'New Password', 'trim|required|min_length[5]');
        $this->form_validation->set_rules('retpwd', 'Confirm Password', 'trim|required|matches[newpwd]');
        if ($this->form_validation->run() == FALSE) {
            $errors = $this->form_validation->error_array();
            if (isset($errors['curpwd'])) {
                $response['msg'] = 'Current password is required';
                echo json_encode($response);
                exit;
            }
            if (isset($errors['newpwd'])) {
                $response['msg'] = 'New password is required';
                echo json_encode($response);
                exit;
            }
            if (isset($errors['retpwd'])) {
                $response['msg'] = ERROR_PASSWORDS_DONT_MATCH;
                echo json_encode($response);
                exit;
            }
        }
        $admin = $this->session->userdata('admin');
        $id = $admin['id'];

        $curpwd = $this->input->post('curpwd');
        $newpwd = $this->input->post('newpwd');
        $retpwd = $this->input->post('retpwd');

        $bcrypt_curpwd = $this->AdminModel->hashPassword($curpwd);
        $sql = "
         SELECT
            id
         FROM 
            admin 
        WHERE 
            id = ? AND STRCMP(password, ?) = 0 AND active = 1";
        $query = $this->db->query($sql, array($id, $bcrypt_curpwd));
        $row = $query->row();
        if (!$row) {
            $response['msg'] = "Your current password is incorrect!";
            echo json_encode($response);
            exit;
        }
        
        $bcrypt_newpwd = $this->AdminModel->hashPassword($newpwd);

        try {
            $this->db->update('admin', array('password' => $bcrypt_newpwd), "id = $id");
            $response['success'] = TRUE;
            $response['msg'] = "Password Updated";
        } catch (Exception $ex) {
            $response['msg'] = $ex->getMessage();
        }
        echo json_encode($response);
        exit;
    }

}

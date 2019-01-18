<?php

defined('BASEPATH') OR exit('No direct script access allowed');
/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of Send Messages
 *
 * @author Ahmad Mahmoud
 */
class Sendnotifications extends CI_Controller {

    public function __construct() {
        parent::__construct();
        if (!$this->session->has_userdata('admin')) {
            redirect($this->config->item('admin_url'), 'refresh');
        }
    }

    public function index() {
        $users = $this->AdminModel->getUsersIdNames();
        $result = $this->AdminModel->getAdminNotifications();
        $data = array(
            'view' => 'admin/sendnotifications/index',
            'messages' => $result,
            'users' => $users,
        );
        $this->load->view('layouts/admin', $data);
    }

    public function add() {
        $response = array('success' => FALSE, 'msg' => '');
        if (!$this->AdminModel->verifyRequest()) {
            $response['msg'] = "Invalid Request!";
            echo json_encode($response);
            exit;
        }
        $post = $this->input->post();
        $this->form_validation->set_data($post);
        $this->form_validation->set_rules('message', 'Message', 'trim|required|min_length[1]');
        $this->form_validation->set_rules('user', 'User', 'trim|required|integer|min_length[1]');
        $this->form_validation->set_rules('allusers', 'All Users', 'trim|required|integer|min_length[1]');
        if ($this->form_validation->run() == FALSE) {
            $response['msg'] = "Invalid Request!";
            echo json_encode($response);
            exit;
        }
        $message = $this->input->post('message');
        $user_id = $this->input->post('user');
        $allusers = $this->input->post('allusers');
        $created = date('Y-m-d H:i:s');

        if ($allusers) {
            $users = $this->AdminModel->getUsersIdNames();
            if (!$users) {
                $response['msg'] = "Users not found!";
                echo json_encode($response);
                exit;
            }
            $fields = array(
                'message' => $message,
                'allusers' => 1,
                'created' => $created
            );
            $this->db->insert('admin_notifications', $fields);

            $arr_users = array();
            foreach ($users as $user) {
                $arr_users[] = $user->id;
            }
            $response['msg'] = "Message has been send to all users!";
        } else {
            $user = $this->AdminModel->getUserIdName($user_id);
            if (!$user) {
                $response['msg'] = "User not found";
                echo json_encode($response);
                exit;
            }

            $fields = array(
                'message' => $message,
                'user_id' => $user->id,
                'allusers' => 0,
                'created' => $created
            );
            $this->db->insert('admin_notifications', $fields);

            $arr_users = array($user->id);
            $response['msg'] = 'Notification has been send to "' . $user->username . '"';
        }

        if (!count($arr_users)) {
            $response['msg'] = "Users not found!";
            echo json_encode($response);
            exit;
        }
        
        $return = $this->PushModel->sendOneSignal($message, $arr_users);
        $httpcode = $return['httpcode'];
        $result = json_decode($return['result']);
        if($httpcode == 400){
            $errors = $result->errors;
            $response['msg'] = $errors[0];
        }elseif($httpcode == 200){
            if(isset($result->errors)){
                if(!isset($result->recipients)){
                    $response['success'] = TRUE;
                }else{
                    $errors = $result->errors;
                    $response['msg'] = $errors[0];
                }
            }else{
                $response['success'] = TRUE;
            }
        }
        
        echo json_encode($response);
        exit;
    }

}
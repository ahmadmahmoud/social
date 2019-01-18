<?php

defined('BASEPATH') OR exit('No direct script access allowed');
/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of Messages
 *
 * @author pslpt189
 */
class Messages extends CI_Controller {

    public function __construct() {
        parent::__construct();
        if (!$this->session->has_userdata('admin')) {
            redirect($this->config->item('admin_url'), 'refresh');
        }
    }

    public function index() {
        $result = $this->AdminModel->getMessages();
        $data = array(
            'view' => 'admin/messages/index',
            'messages' => $result
        );
        $this->load->view('layouts/admin', $data);
    }

    public function view() {
        $response = array('success' => FALSE, 'msg' => '');
        if (!$this->AdminModel->verifyRequest()) {
            $response['msg'] = "Invalid Request!";
            echo json_encode($response);
            exit;
        }
        $get = array(
            'id' => $this->input->get('id')
        );
        $this->form_validation->set_data($get);
        $this->form_validation->set_rules('id', 'ID', 'trim|required|integer|is_natural_no_zero|min_length[1]');
        if ($this->form_validation->run() == FALSE) {
            $response['msg'] = "Invalid Parameters";
            echo json_encode($response);
            exit;
        }
        $id = $this->input->get('id');
        $stream = $this->AdminModel->getMessageStream($id);
        if (!$stream) {
            $response['msg'] = "Conversation not found";
            echo json_encode($response);
            exit;
        }

        $arr = array();
        $chat = '<ul class="chat">';
        foreach ($stream as $row) {
            if (!isset($arr[$row->sender_id])) {
                if (count($arr) == 0) {
                    $arr[$row->sender_id] = 'left';
                } else {
                    $arr[$row->sender_id] = 'right';
                }
            }
            $avatar = base_url() . 'public/avatar/' . $row->sende_avatar;
            $dir = $arr[$row->sender_id];
                $chat .= '
                <li class="left clearfix">
                    <span class="chat-img pull-left"><img alt="User Avatar" class="img-circle" src="'.$avatar.'" style="width:50px"></span>
                    <div class="chat-body clearfix">
                        <div class="header">
                            <div><strong class="primary-font">' . $row->sender_name . '</strong></div>
                        </div>
                        <p>' . $row->message . '</p>
                        <p class="momentts" style="font-size:11px">' . $row->created . '</p>
                    </div>
                </li>';
        }
        $chat .= '</ul>';

        $response['success'] = true;
        $response['content'] = $chat;

        echo json_encode($response);
        exit;
    }

}

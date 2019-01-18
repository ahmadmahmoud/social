<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of REST_Controller
 *
 * @author Ahmad Mahmoud
 */
class REST_Controller extends CI_Controller {

    protected $user;
    protected $datetime;
    protected $badge = 0;
    protected $active = 0;

    public function __construct($verify = false) {
        parent::__construct();
        if ($verify) {
            $apikey = $this->input->get_request_header('apikey', TRUE);
            $this->getUser($apikey);
            $this->getBadge($this->user->id);
        }
        $this->datetime = date('Y-m-d H:i:s');
    }

    public function setActive() {
        $this->active = 1;
    }

    public function success($message, $meta, $data) {
        $response = array('apiVersion' => API_VER, 'meta' => $meta, 'badge' => strval($this->badge), 'active' => strval($this->active), 'message' => $message, 'data' => $data, 'elapsed' => $this->benchmark->elapsed_time());
        $this->output
                ->set_status_header(200)
                ->set_content_type('application/json', 'utf-8')
                ->set_output(json_encode($response, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES))
                ->_display();
        exit;
    }

    public function failed($message) {
        $response = array('apiVersion' => API_VER, 'badge' => strval($this->badge), 'error' => array('code' => '401', 'message' => $message, 'elapsed' => $this->benchmark->elapsed_time()));
        $this->output
                ->set_status_header(401)
                ->set_content_type('application/json', 'utf-8')
                ->set_output(json_encode($response, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES))
                ->_display();
        exit;
    }

    public function verifyRestUser() {
        $apikey = $this->input->get_request_header('apikey', TRUE);
        if (!$apikey || !trim($apikey) || filter_var($apikey, FILTER_SANITIZE_STRING) === FALSE) {
            return FALSE;
        }
        $sql = "
        SELECT
            u.*
        FROM 
            users u
        WHERE 
            u.apikey = ? AND u.active = 1";
        $query = $this->db->query($sql, array($apikey));
        $result = $query->row();
        if (!$result) {
            return FALSE;
        }
        $method = $this->input->method(TRUE);
        if ($method == METHOD_POST) {
            $user_id = $this->input->post('user_id');
        }
        if ($method == METHOD_GET) {
            $user_id = $this->input->get('user_id');
        }
        if($result->id != $user_id){
            return FALSE;
        }
        $this->user = $result;
        return TRUE;
    }

    protected function verifyPostAddressID() {
        $post = $this->input->post();
        $this->form_validation->set_data($post);
        $this->form_validation->set_rules('address_id', 'Address ID', 'trim|required|integer|is_natural_no_zero|min_length[1]');

        if ($this->form_validation->run() == FALSE) {
            $errors = $this->form_validation->error_array();
            if (isset($errors['address_id'])) {
                $this->failed(MSG_ADDRESS_REQUIRED);
            }
        }
        $this->user->address_id = $this->input->post('address_id');
    }

    protected function verifyPostSendMessage() {
        $post = $this->input->post();
        $this->form_validation->set_data($post);
        $this->form_validation->set_rules('shop_id', 'Shop ID', 'trim|required|integer|is_natural_no_zero|min_length[1]');
        $this->form_validation->set_rules('title', 'Title', 'trim|required|min_length[2]');
        $this->form_validation->set_rules('note', 'Note', 'trim|required|min_length[2]');
        if ($this->form_validation->run() == FALSE) {
            $errors = $this->form_validation->error_array();
            if (isset($errors['shop_id'])) {
                $this->failed(MSG_REQUIRE_SHOP);
            }
            if (isset($errors['title'])) {
                $this->failed(MSG_REQUIRE_TITLE);
            }
            if (isset($errors['note'])) {
                $this->failed(MSG_REQUIRE_NOTE);
            }
        }
        $params = new stdClass;
        $params->shop_id = $this->input->post('shop_id');
        $params->title = $this->input->post('title');
        $params->note = $this->input->post('note');
        $this->user->params = $params;
    }

    protected function getUser($apikey) {
        if (!$apikey || !trim($apikey) || filter_var($apikey, FILTER_SANITIZE_STRING) === FALSE) {
            $this->failed(MSG_APIKEY_MISSING);
        }
        $sql = "
        SELECT
            u.*
        FROM 
            users u
        WHERE 
            u.apikey = ?";
        $query = $this->db->query($sql, array($apikey));
        $result = $query->row();
        if (!$result) {
            $this->failed(MSG_APIKEY_WRONG);
        }
        $method = $this->input->method(TRUE);
        if ($method == METHOD_POST) {
            $user_id = $this->input->post('user_id');
        }
        if ($method == METHOD_GET) {
            $user_id = $this->input->get('user_id');
        }
        if ($user_id != $result->id) {
            $this->failed(MSG_USER_MISMATCH);
        }
        $this->user = $result;
        $this->user->device = $this->getDevice($user_id);
        $this->updateUser($user_id);
        $this->active = $result->active;
    }

    private function getBadge($user_id) {
        $sql = "SELECT COUNT(id) as unread FROM `notifications` WHERE notified_id = ? AND seen = 0";
        $query = $this->db->query($sql, array($user_id));
        $result = $query->row();
        $this->badge = $result->unread;
    }

    private function getDevice($user_id) {
        $sql = "SELECT * FROM devices WHERE user_id = ? LIMIT 1";
        $query = $this->db->query($sql, array($user_id));
        $result = $query->row();
        return $result;
    }

    private function updateUser($user_id) {
        $created = date('Y-m-d H:i:s');
        $this->db->update('profile', array('lastupdate' => $created), array('user_id' => $user_id));
    }

}

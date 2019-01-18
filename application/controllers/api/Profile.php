<?php

defined('BASEPATH') OR exit('No direct script access allowed');
require(APPPATH . 'libraries/REST_Controller.php');
/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of Profile
 *
 * @author pslpt189
 */
class Profile extends REST_Controller {

    public function __construct() {
        parent::__construct(TRUE);
    }
    
    public function me() {
        $user_id = $this->user->id;
        $profile = $this->UserModel->getProfile($user_id);
        unset($profile->id);
        unset($profile->user_id);
        $profile->age = ($profile->age) ? $profile->age : "";
        $profile->about = ($profile->about) ? $profile->about : "";
        $profile->phone = ($profile->phone) ? $profile->phone : "";
        $profile->city = ($profile->city) ? $profile->city : "";
        $profile->country = ($profile->country) ? $profile->country : "";
        $profile->lastupdate = ($profile->lastupdate) ? $profile->lastupdate : "";
        $profile->avatar = base_url() . URL_AVATAR . $profile->avatar;
        $profile->cover = base_url() . URL_COVER . $profile->cover;
        
        $links = $this->UserModel->getSocialLinks($user_id);
        $device = $this->user->device;
        $admob = $this->CommonModel->getAdMob($device, 'profile');
        $data = array(
            'profile' => $profile,
            'links' => ($links) ? $links : array(),
            'admob' => (isset($admob) && $admob->admob) ? $admob->admob : ""
        );
        $this->success("", array(), $data);
    }
    
    public function user() {
        $get = array('profile_id' => $this->input->get('profile_id'));
        $this->form_validation->set_data($get);
        $this->form_validation->set_rules('profile_id', 'Profile ID', 'trim|required|integer|is_natural_no_zero|min_length[1]');
        if ($this->form_validation->run() == FALSE) {
            $errors = $this->form_validation->error_array();
            if (isset($errors['profile_id'])) {
                $this->failed(MSG_PROFILEID_REQUIRED);
            }
        }
        $user_id = $this->user->id;
        $profile_id = $this->input->get('profile_id');
        if($user_id == $profile_id){
            $this->failed(MSG_JOKING_ERROR);
        }
        $profile = $this->UserModel->getProfile($profile_id);
        unset($profile->id);
        unset($profile->user_id);
        $profile->age = ($profile->age) ? $profile->age : "";
        $profile->about = ($profile->about) ? $profile->about : "";
        $profile->phone = ($profile->phone) ? $profile->phone : "";
        $profile->city = ($profile->city) ? $profile->city : "";
        $profile->country = ($profile->country) ? $profile->country : "";
        $profile->lastupdate = ($profile->lastupdate) ? $profile->lastupdate : "";
        $profile->avatar = base_url() . URL_AVATAR . $profile->avatar;
        $profile->cover = base_url() . URL_COVER . $profile->cover;
        
        $links = $this->UserModel->getSocialLinks($profile_id);
        $device = $this->user->device;
        $admob = $this->CommonModel->getAdMob($device, 'profile');
        $data = array(
            'profile' => $profile,
            'links' => ($links) ? $links : array(),
            'admob' => (isset($admob) && $admob->admob) ? $admob->admob : ""
        );
        $this->success("", array(), $data);
    }
    
    public function update() {
        $user_id = $this->input->post('user_id');
        $age = $this->input->post('age');
        $about = $this->input->post('about');
        $phone = $this->input->post('phone');
        $email = $this->input->post('email');
        $gender = $this->input->post('gender');
        $city = $this->input->post('city');
        $country = $this->input->post('country');
        $found = FALSE;
        if ($email && filter_var($email, FILTER_VALIDATE_EMAIL)) {
            $found = TRUE;
        } else {
            $email = "";
        }
        if ($email) {
            $fields = array();
            $fields['email'] = $email;
            $this->db->update('users', $fields, array('id' => $user_id));
        }

        if ($age && filter_var($age, FILTER_VALIDATE_INT)) {
            $found = TRUE;
        } else {
            $age = "";
        }
        if ($about && filter_var($about, FILTER_SANITIZE_STRING)) {
            $found = TRUE;
        } else {
            $about = "";
        }
        if ($phone && filter_var($phone, FILTER_SANITIZE_STRING)) {
            $found = TRUE;
        } else {
            $phone = "";
        }
        if (filter_var($gender, FILTER_VALIDATE_INT)) {
            $found = TRUE;
        } else {
            $gender = 0;
        }
        if ($city && filter_var($city, FILTER_SANITIZE_STRING)) {
            $found = TRUE;
        } else {
            $city = "";
        }
        if ($country && filter_var($country, FILTER_SANITIZE_STRING)) {
            $found = TRUE;
        } else {
            $country = "";
        }
        if (!$found) {
            $this->failed(PROFILE_UPDATE_FAILED);
        }
        $fields = array(
            'age' => $age,
            'about' => $about,
            'phone' => $phone,
            'gender' => $gender,
            'city' => $city,
            'country' => $country
        );
        if ($this->db->update('profile', $fields, array('user_id' => $user_id)) !== FALSE) {
            $this->success(PROFILE_UPDATE_SUCCESS, array(), array());
        } else {
            $this->failed(PROFILE_UPDATE_FAILED);
        }
    }

    public function changeUsername() {
        $post = $this->input->post();
        $this->form_validation->set_data($post);
        $this->form_validation->set_rules('username', 'Username', 'trim|required|min_length[2]');
        if ($this->form_validation->run() == FALSE) {
            $errors = $this->form_validation->error_array();
            if (isset($errors['username'])) {
                $this->failed(MSG_USERNAME_REQUIRED);
            }
        }
        $user_id = $this->user->id;
        $username = $this->input->post('username');

        if (!preg_match('/^\w{2,}$/', $username)) { // \w equals "[0-9A-Za-z_]"
            $this->failed(MSG_USERNAME_INVALID);
        }

        $sql = "SELECT id FROM users WHERE username = ? AND id <> ? AND active = 1";
        $query = $this->db->query($sql, array($username, $user_id));
        $result = $query->row();
        if ($result) {
            $this->failed(MSG_USERNAME_TAKEN);
        }
        
        $sql = "SELECT id FROM requests WHERE user_id = ?";
        $query = $this->db->query($sql, array($user_id));
        $result = $query->row();
        if ($result) {
            $this->failed(MSG_CHANGEUSERNAME_DUPLICATE);
        }
        $created = date('Y-m-d H:i:s');
        $fields = array(
            'user_id' => $user_id,
            'username' => $username,
            'created' => $created
        );
        $this->db->insert('requests', $fields);
        $this->success(MSG_CHANGEUSERNAME_REVIEW, array(), array());
        /*$this->db->update('users', array('username' => $username), array('id' => $user_id));
        $this->success(MSG_USERNAME_SUCCESS, array(), array());*/
    }

    public function updateAvatar() {
        $user_id = $this->input->post('user_id');

        $config['upload_path'] = './public/uploads/';
        $config['allowed_types'] = 'gif|jpg|png|jpeg';
        $config['max_size'] = '1024';
        $config['encrypt_name'] = TRUE;
        $this->load->library('upload', $config);
        $this->upload->initialize($config);

        $avatar = null;
        if ($this->upload->do_upload('avatar')) {
            $avatar = $this->upload->data();
        } else {
            $this->failed(MSG_REQUIRE_AVATAR);
        }

        $file_name = $avatar['file_name'];
        rename(UPLOAD_PATH . $file_name, UPLOAD_PATH_AVATAR . $file_name);
        $this->db->update('profile', array('avatar' => $file_name), array('user_id' => $user_id));

        $this->success(MSG_AVATAR_SUCCESS, array(), array());
    }

    public function updateCover() {
        $user_id = $this->input->post('user_id');

        $config['upload_path'] = './public/uploads/';
        $config['allowed_types'] = 'gif|jpg|png|jpeg';
        $config['max_size'] = '1024';
        $config['encrypt_name'] = TRUE;
        $this->load->library('upload', $config);
        $this->upload->initialize($config);

        $cover = null;
        if ($this->upload->do_upload('cover')) {
            $cover = $this->upload->data();
        } else {
            $this->failed(MSG_REQUIRE_COVER);
        }

        $file_name = $cover['file_name'];
        rename(UPLOAD_PATH . $file_name, UPLOAD_PATH_COVER . $file_name);
        $this->db->update('profile', array('cover' => $file_name), array('user_id' => $user_id));

        $this->success(MSG_COVER_SUCCESS, array(), array());
    }
    
    public function contactus() {
        $post = $this->input->post();
        $this->form_validation->set_data($post);
        $this->form_validation->set_rules('title', 'Title', 'trim|required|min_length[1]');
        $this->form_validation->set_rules('message', 'Message', 'trim|required|min_length[1]');
        if ($this->form_validation->run() == FALSE) {
            $errors = $this->form_validation->error_array();
            if (isset($errors['title'])) {
                $this->failed(MSG_TITLE_REQUIRED);
            }
            if (isset($errors['message'])) {
                $this->failed(MSG_MESSAGE_REQUIRED);
            }
        }
        $user_id = $this->user->id;
        $title = $this->input->post('title');
        $message = $this->input->post('message');
        
        if(!filter_var($title, FILTER_SANITIZE_STRING)){
            $this->failed(MSG_TITLE_REQUIRED);
        }
        
        if(!filter_var($message, FILTER_SANITIZE_STRING)){
            $this->failed(MSG_MESSAGE_REQUIRED);
        }
        
        $ipaddress = $this->CommonModel->getClientIP();
        
        $created = date('Y-m-d H:i:s');
        $fields = array(
            'user_id' => $user_id,
            'title' => $title,
            'message' => $message,
            'ipaddress' => $ipaddress,
            'created' => $created
        );
        $this->db->insert('contactus', $fields);
        $this->success(MSG_CONTACTUS_SUCCESS, array(), array());
    }
    
    public function otherapps() {
        /*$user_id = $this->user->id;
        $device = $this->CommonModel->getUserDeviceInfo($user_id);
        $app_id = $this->CommonModel->getCurrentAppId();
        if($device){
            $os = $device->os;
        }else{
            $os = 'android';
        }
        $result = $this->CommonModel->getOtherApps($app_id, $os);
        $this->success("", array(), $result);*/
        $content = '';
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, OTHERAPPS_URL);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
        curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, 3);
        $data = curl_exec($ch);
        $http_code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
        curl_close($ch);
        if($http_code == 200){
            $content = $data;
        }
        $this->output->set_status_header(200)->set_content_type('text/html', 'utf-8')->set_output($content)->_display();
        exit;
    }

}
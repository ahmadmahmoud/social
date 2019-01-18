<?php

defined('BASEPATH') OR exit('No direct script access allowed');
require(APPPATH . 'libraries/REST_Controller.php');
/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of Users
 *
 * @author Ahmad Mahmoud
 */
class Users extends REST_Controller {

    public function auth_delete() {
        if ($this->verifyRestUser() == FALSE) {
            $this->failed(MSG_USER_MISMATCH);
        }
        $user_id = $this->user->id;
        $this->db->trans_start();
        $this->db->query("DELETE FROM admin_messages WHERE user_id = {$user_id}");
        $this->db->query("DELETE FROM admin_notifications WHERE user_id = {$user_id}");
        $this->db->query("DELETE FROM comments WHERE user_id = {$user_id}");
        $this->db->query("DELETE FROM contactus WHERE user_id = {$user_id}");
        $this->db->query("DELETE FROM conversations WHERE (sender_id = {$user_id} OR receiver_id = {$user_id})");
        $this->db->query("DELETE FROM devices WHERE user_id = {$user_id}");
        $this->db->query("DELETE FROM dislikes WHERE user_id = {$user_id}");
        $this->db->query("DELETE FROM downloads WHERE user_id = {$user_id}");
        $this->db->query("DELETE FROM likes WHERE user_id = {$user_id}");
        $this->db->query("DELETE FROM messages WHERE (sender_id = {$user_id} OR receiver_id = {$user_id})");
        $this->db->query("DELETE FROM notifications WHERE user_id = {$user_id}");
        $this->db->query("DELETE FROM notifications WHERE notified_id = {$user_id}");
        $this->db->query("DELETE FROM posts WHERE user_id = {$user_id}");
        $this->db->query("DELETE FROM profile WHERE user_id = {$user_id}");
        $this->db->query("DELETE FROM reports WHERE user_id = {$user_id}");
        $this->db->query("DELETE FROM users WHERE id = {$user_id}");
        $this->db->trans_complete();
        if ($this->db->trans_status() === FALSE) {
            $this->failed(MSG_ACCOUNT_DELETE_FAILED);
        }else{
            $this->failed(MSG_ACCOUNT_DELETE_SUCCESS);
        }
    }

    public function auth_hello() {
        $post = $this->input->post();
        $this->form_validation->set_data($post);
        $this->form_validation->set_rules('udid', 'UDID', 'trim|required|min_length[5]');
        $this->form_validation->set_rules('device', 'Device', 'trim|required|min_length[5]');
        $this->form_validation->set_rules('iso', 'Country', 'trim|required|min_length[2]');
        if ($this->form_validation->run() == FALSE) {
            $errors = $this->form_validation->error_array();
            if (isset($errors['udid'])) {
                $this->failed(MSG_LOGIN_UDID);
            }
            if (isset($errors['device'])) {
                $this->failed(MSG_LOGIN_DEVICE);
            }
            if (isset($errors['iso'])) {
                $this->failed(MSG_ISO_REQUIRED);
            }
        }
        $udid = $this->input->post('udid');
        $device = $this->input->post('device');
        $iso = $this->input->post('iso');

        $arr_device = json_decode($device, TRUE);
        if (json_last_error() !== JSON_ERROR_NONE) {
            $this->failed(MSG_LOGIN_DEVICE);
        }
        if (!isset($arr_device['os'])) {
            $this->failed(MSG_LOGIN_DEVICE);
        }
        $os = $arr_device['os'];

        $result = $this->verifyPhone($udid);
        if ($result):
            if (!$result->active) {
                $this->failed(MSG_USER_BLOCK);
            }
            $user_id = $result->id;
            $user = array(
                'id' => $user_id,
                'username' => $result->username,
                'new' => "0",
                'apikey' => $result->apikey
            );
            $this->active = 1;
        else:
            $created = date('Y-m-d H:i:s');
            $username = $this->createUsername(4);
            $country = $this->getCountry(strtolower($iso));
            $country_id = ($country) ? $country->id : 1;
            $active = 1;
            $apikey = password_hash(PASS_HASH_SALT, PASSWORD_DEFAULT);
            $fields = array(
                'username' => $username,
                'email' => "",
                'active' => $active,
                'udid' => $udid,
                'created' => $created,
                'apikey' => $apikey,
                'country' => $country_id
            );
            $this->db->insert('users', $fields);
            $user_id = $this->db->insert_id();
            if (!$user_id) {
                $this->failed(MSG_REGISTERATION_FAILED);
            }

            $profile = array(
                'user_id' => $user_id,
                'cover' => "default_cover.png",
                'avatar' => "default_avatar.png"
            );
            $this->db->insert('profile', $profile);

            $user = array(
                'id' => strval($user_id),
                'username' => $username,
                'new' => "1",
                'apikey' => $apikey
            );
        endif;
        $this->UserModel->saveDevice($user_id, $udid, $device);
        $this->setActive();

        //WELCOME
        $causestypes = $this->CommonModel->getReportCauses();
        $socialmedia = $this->PublicModel->getSocialMediaTypes();
        $admobs = $this->PublicModel->geAdMobs();
        $settings = $this->PublicModel->getSettings();
        unset($settings->maxpostcount);
        unset($settings->logo);
        unset($settings->maxnotifications);
        unset($settings->maxmessages);
        unset($settings->onesignal_appid);
        unset($settings->onesignal_apikey);
        $welcome = array(
            'mediatypes' => $socialmedia,
            'reporttypes' => $causestypes,
            'admobs' => $admobs,
            'settings' => $settings
        );

        //PAGE 1 POSTS
        $page = 1;
        $dev = new stdClass();
        $dev->os = $os;
        $banners = $this->CommonModel->getBanners($os);
        $admobs = $this->CommonModel->getAdMob($dev, 'allposts');
        $admob = (isset($admobs) && $admobs->admob) ? $admobs->admob : "";
        $admobs_reward = $this->CommonModel->getRewardedAdMob($device, 'allposts');
        $admob_reward = (isset($admobs_reward) && $admobs_reward->admob) ? $admobs_reward->admob : "";
        $data = $this->PostsModel->getPostsAll($user_id, $page);
        $this->PostsModel->setPostView($data['result']);

        $result = new stdClass();
        $result->posts = $data['result'];
        $result->banners = $banners;
        $result->admob = $admob;
        $result->admob_reward = $admob_reward;

        $output = array(
            'user' => $user,
            'welcome' => $welcome,
            'result' => $result
        );
        $this->success(MSG_LOGIN_SUCCESS, array(), $output);
    }

    public function auth_login() {
        $post = $this->input->post();
        $this->form_validation->set_data($post);
        $this->form_validation->set_rules('udid', 'UDID', 'trim|required|min_length[5]');
        $this->form_validation->set_rules('device', 'Device', 'trim|required|min_length[5]');
        $this->form_validation->set_rules('iso', 'Country', 'trim|required|min_length[2]');
        if ($this->form_validation->run() == FALSE) {
            $errors = $this->form_validation->error_array();
            if (isset($errors['udid'])) {
                $this->failed(MSG_LOGIN_UDID);
            }
            if (isset($errors['device'])) {
                $this->failed(MSG_LOGIN_DEVICE);
            }
            if (isset($errors['iso'])) {
                $this->failed(MSG_ISO_REQUIRED);
            }
        }
        $udid = $this->input->post('udid');
        $device = $this->input->post('device');
        $iso = $this->input->post('iso');

        $result = $this->verifyPhone($udid);
        if ($result):
            if (!$result->active) {
                $this->failed(MSG_USER_BLOCK);
            }
            $user_id = $result->id;
            $user = array(
                'id' => $user_id,
                'username' => $result->username,
                'new' => "0",
                'apikey' => $result->apikey
            );
            $this->active = 1;
        else:
            $created = date('Y-m-d H:i:s');
            $username = $this->createUsername(4);
            $country = $this->getCountry(strtolower($iso));
            $country_id = ($country) ? $country->id : 1;
            $active = 1;
            $apikey = password_hash(PASS_HASH_SALT, PASSWORD_DEFAULT);
            $fields = array(
                'username' => $username,
                'email' => "",
                'active' => $active,
                'udid' => $udid,
                'created' => $created,
                'apikey' => $apikey,
                'country' => $country_id
            );
            $this->db->insert('users', $fields);
            $user_id = $this->db->insert_id();
            if (!$user_id) {
                $this->failed(MSG_REGISTERATION_FAILED);
            }

            $profile = array(
                'user_id' => $user_id,
                'cover' => "default_cover.png",
                'avatar' => "default_avatar.png"
            );
            $this->db->insert('profile', $profile);

            $user = array(
                'id' => strval($user_id),
                'username' => $username,
                'new' => "1",
                'apikey' => $apikey
            );
        endif;
        $this->UserModel->saveDevice($user_id, $udid, $device);
        $this->setActive();
        $this->success(MSG_LOGIN_SUCCESS, array(), $user);
    }

    public function logout() {
        $this->success(MSG_LOGOUT_SUCCESS, array(), array());
    }

    private function verifyPhone($udid) {
        $sql = "SELECT u.* FROM users u WHERE u.udid = ? LIMIT 1";
        $query = $this->db->query($sql, array($udid));
        $result = $query->row();
        return ($result) ? $result : FALSE;
    }

    private function createUsername($length) {
        $found = false;
        $username = '';
        while (!$found) {
            $username = $this->UserModel->generateUsername($length);
            $sql = "SELECT id FROM users WHERE username = ? AND active = 1";
            $query = $this->db->query($sql, array($username));
            $result = $query->row();
            if (!$result) {
                $found = true;
            }
        }
        return $username;
    }

    private function getCountry($iso) {
        $sql = "SELECT * FROM countries WHERE code = ? AND active = 1";
        $query = $this->db->query($sql, array($iso));
        $result = $query->row();
        return ($result) ? $result : FALSE;
    }

}

<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of UserModel
 *
 * @author pslpt189
 */
class UserModel extends CI_Model {
    
    public function searchUsers($keyword) {
        $url_avatar = base_url() . URL_AVATAR;
        $sql = "
        SELECT 
            SQL_CALC_FOUND_ROWS
            u.id as user_id,
            u.username,
            CONCAT('{$url_avatar}', p.avatar) as avatar
        FROM 
            users u
        INNER JOIN profile p ON p.user_id = u.id AND u.active = 1
        WHERE 
            u.username LIKE '%{$keyword}%' ESCAPE '!'
        ORDER BY u.username ASC";
        $query = $this->db->query($sql);
        $result = $query->result();
        
        $query = $this->db->query('SELECT FOUND_ROWS() AS Total');
        $total = $query->row()->Total;
        
        return array(
            'result' => ($result) ? $result : array(),
            'total' => ($result) ? $total : 0,
            'count' => ($result) ? count($result) : 0
        );
    }

    public function getProfile($user_id) {
        $sql = "
        SELECT 
            u.username, p.* 
        FROM 
            profile p 
        INNER JOIN users u ON p.user_id = u.id AND u.active = 1
        WHERE 
            p.user_id = ?";
        $query = $this->db->query($sql, array($user_id));
        $result = $query->row();
        return ($result) ? $result : FALSE;
    }
    
    public function getSocialLinks($user_id) {
        $sql = "
        SELECT 
            sl.social_media_id as id,
            sm.name,
            sl.link
        FROM 
            social_links sl
        INNER JOIN social_media sm ON sl.social_media_id = sm.id
        WHERE 
            sl.user_id = ?";
        $query = $this->db->query($sql, array($user_id));
        $result = $query->result();
        return ($result) ? $result : FALSE;
    }

    public function saveDevice($user_id, $udid, $deviceInfo) {
        $device = json_decode($deviceInfo, true);
        if (json_last_error() !== JSON_ERROR_NONE) {
            return false;
        }
        if (!$device || !is_array($device)) {
            return false;
        }
        $os = $device['os'];
        $os_ver = $device['os_ver'];
        $app_ver = $device['app_ver'];
        $model = $device['model'];
        $token = trim($device['token']);
        if (!$token) {
            //return false;
        }
        $this->db->delete('devices', array('user_id' => $user_id));
        $created = date('Y-m-d H:i:s');
        $fields = array(
            'user_id' => $user_id,
            'os' => $os,
            'os_ver' => $os_ver,
            'app_ver' => $app_ver,
            'model' => $model,
            'token' => $token,
            'udid' => $udid,
            'created' => $created
        );
        $this->db->insert('devices', $fields);
    }

    public function generateUsername($length) {
        $username = 'user' . mt_rand(1000, 9999);
        return $username;



        /* $characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
          $randomString = '';
          for ($i = 0; $i < $length; $i++) {
          $randomString .= $characters[rand(0, strlen($characters) - 1)];
          }
          return strtolower($randomString); */
    }

}

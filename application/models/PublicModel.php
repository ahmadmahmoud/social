<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of PublicModel
 *
 * @author pslpt189
 */
class PublicModel extends CI_Model {
    
    public function getSettings() {
        $sql = "SELECT * FROM `settings` LIMIT 1";
        $query = $this->db->query($sql);
        $row = $query->row();
        return $row;
    }
    
    public function geAdMobs() {
        $os = array(
            'android' => "",
            'ios' => "",
            'android_admob_reward' => "",
            'ios_admob_reward' => ""
        );
        $admobs = array(
            'allposts' => $os,
            'mostviewed' => $os,
            'chat' => $os,
            'messages' => $os,
            'settings' => $os,
            'profile' => $os,
            'notifications' => $os,
            'admob_app_id' => $os
        );
        $sql = "SELECT * FROM `admobs` LIMIT 1";
        $query = $this->db->query($sql);
        $result = $query->row();
        if(!$result){
            return $admobs;
        }
        
        if($result->allposts){
            $admobs['allposts'] = array(
                'android' => $result->android,
                'ios' => $result->ios,
                'android_admob_reward' => $result->rewarded_android,
                'ios_admob_reward' => $result->rewarded_ios
            );
        }
        if($result->mostviewed){
            $admobs['mostviewed'] = array(
                'android' => $result->android,
                'ios' => $result->ios,
                'android_admob_reward' => $result->rewarded_android,
                'ios_admob_reward' => $result->rewarded_ios
            );
        }
        if($result->chat){$admobs['chat'] = array('android' => $result->android,'ios' => $result->ios);}
        if($result->messages){$admobs['messages'] = array('android' => $result->android,'ios' => $result->ios);}
        if($result->settings){$admobs['settings'] = array('android' => $result->android,'ios' => $result->ios);}
        if($result->profile){$admobs['profile'] = array('android' => $result->android,'ios' => $result->ios);}
        if($result->notifications){$admobs['notifications'] = array('android' => $result->android,'ios' => $result->ios);}
        $admobs['admob_app_id'] = array('android' => $result->android_appid,'ios' => $result->ios_appid);
        //$admobs['app_id'] = array('android' => $result->android_appid,'ios' => $result->ios_appid);
        return $admobs;
    }
    
    public function getSocialMediaTypes() {
        $path = base_url() . URL_ASSETS_PATH;
        $sql = "
        SELECT 
            id, 
            name, 
            CONCAT('{$path}', icon) as icon
        FROM 
            social_media 
        ORDER BY name ASC";
        $query = $this->db->query($sql);
        $result = $query->result();
        return $result;
    }
}

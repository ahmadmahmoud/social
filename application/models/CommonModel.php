<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of CommonModel
 *
 * @author Ahmad Mahmoud
 */
class CommonModel extends CI_Model {
    
    public function getRewardedAdMob($device, $section) {
        if(!$device){return "";}
        if(!isset($device->os)){return "";}
        $os = $device->os;
        if($os === 'ios'){
            $field = 'rewarded_ios';
        }elseif($os === 'android'){
            $field = 'rewarded_android';
        }else{
            return "";
        }
        $sql = "SELECT {$field} as admob FROM admobs WHERE {$section} = 1";
        $query = $this->db->query($sql);
        $result = $query->row();
        return $result;
    }

public function TimeAgo($datetime){
date_default_timezone_set("UTC");
    $now = new DateTime;
    $ago = new DateTime($datetime);
    $diff = $now->diff($ago);
    $dt = 'الان';
    if($diff->y){
        $dt = $ago->format('d M, Y \\a\\t h:ia');
    }elseif($diff->m){
        $dt = $ago->format('d M \\a\\t h:ia');
    }elseif($diff->d){
        $dt = $ago->format('d M \\a\\t h:ia');
    }elseif($diff->h){
        if($diff->h == 1){
            $dt = 'منذ ساعة';
        }elseif($diff->h == 2){
            $dt = 'منذ ساعتين';
        }elseif($diff->h > 2 && $diff->h <= 10){
            $dt = $diff->h . ' ساعات ';
        }elseif($diff->h > 10){
            $dt = $diff->h . ' ساعة ';
        }
    }elseif($diff->i){
        if($diff->i == 1){
            $dt = 'منذ دقيقة';
        }elseif($diff->i == 2){
            $dt = 'منذ دقيقتين';
        }elseif($diff->i > 2 && $diff->i <= 10){
            $dt = $diff->i . ' دقائق ';
        }elseif($diff->i > 10){
            $dt = $diff->i . ' دقيقة ';
        }
    }elseif($diff->s){
        $dt = 'منذ ثواني';
    }
    return $dt;
}

    public function getCurrentAppId() {
        $sql = "SELECT app_id FROM settings LIMIT 1";
        $query = $this->db->query($sql);
        $result = $query->row();
        return $result->app_id;
    }
    
    public function getLanguages() {
        $sql = "SELECT id,name,code,flag,iso,dir,`default` FROM languages WHERE active = 1 ORDER BY name ASC";
        $query = $this->db->query($sql);
        $languages = $query->result();
        return $languages;
    }
    
    public function getReportCauses() {
        $sql = "SELECT * FROM reports_causes";
        $query = $this->db->query($sql);
        $result = $query->result();
        return $result;
    }
    
    public function getOtherApps($app_id, $os) {
        $url_os = ($os == 'ios') ? 'apple_store_url' : 'google_play_url';
        $db2 = $this->load->database('apps', TRUE);
        $sql = "
        SELECT 
            name,
            logo,
            {$url_os} as url
        FROM 
            `apps` WHERE app_id <> {$app_id}";
        $query = $db2->query($sql);
        $result = $query->result();
        return $result;
    }
    
    public static function getClientIP() {
        if (isset($_SERVER['HTTP_CLIENT_IP']))
            $ipaddress = $_SERVER['HTTP_CLIENT_IP'];
        else if (isset($_SERVER['HTTP_X_FORWARDED_FOR']))
            $ipaddress = $_SERVER['HTTP_X_FORWARDED_FOR'];
        else if (isset($_SERVER['HTTP_X_FORWARDED']))
            $ipaddress = $_SERVER['HTTP_X_FORWARDED'];
        else if (isset($_SERVER['HTTP_FORWARDED_FOR']))
            $ipaddress = $_SERVER['HTTP_FORWARDED_FOR'];
        else if (isset($_SERVER['HTTP_FORWARDED']))
            $ipaddress = $_SERVER['HTTP_FORWARDED'];
        else if (isset($_SERVER['REMOTE_ADDR']))
            $ipaddress = $_SERVER['REMOTE_ADDR'];
        else
            $ipaddress = 'UNKNOWN';
        return $ipaddress;
    }
    
    public function getUserDeviceInfo($user_id) {
        $sql = "SELECT * FROM devices WHERE user_id = ?";
        $query = $this->db->query($sql, array($user_id));
        $result = $query->row();
        return $result;
    }
    
    public function getAdMob($device, $section) {
        if(!$device){return "";}
        if(!isset($device->os)){return "";}
        $os = $device->os;
        if($os === 'ios'){
            $field = 'ios';
        }elseif($os === 'android'){
            $field = 'android';
        }else{
            return "";
        }
        $sql = "SELECT {$field} as admob FROM admobs WHERE {$section} = 1";
        $query = $this->db->query($sql);
        $result = $query->row();
        return $result;
    }

    public function getAgreement() {
        $sql = "
        SELECT * FROM agreement WHERE active = 1 ORDER BY created DESC LIMIT 1";
        $query = $this->db->query($sql);
        $result = $query->row();
        return $result;
    }
    
    public function getBanners($os) {
        $url = base_url() . URL_BANNER;
        if($os == OS_IOS){
            $sql = "
            SELECT 
                CONCAT('{$url}', image) as image,
                url_ios as url
            FROM 
                banners 
            WHERE 
                active = 1 ORDER BY created DESC";
        }else{
            $sql = "
            SELECT 
                CONCAT('{$url}', image) as image, 
                url_android as url
            FROM 
                banners 
            WHERE 
                active = 1 ORDER BY created DESC";
        }
        $query = $this->db->query($sql);
        $result = $query->result();
        return $result;
    }

}

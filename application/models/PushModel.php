<?php

defined('BASEPATH') OR exit('No direct script access allowed');
/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of PushModel
 *
 * @author Ahmad Mahmoud
 */
class PushModel extends CI_Model {

    private $title, $onesignal_appid, $onesignal_apikey;
    private $ready = false;

    public function __construct() {
        parent::__construct();
    }

    private function init() {
        $sql = "SELECT app_name, onesignal_appid, onesignal_apikey FROM settings LIMIT 1";
        $query = $this->db->query($sql);
        $settings = $query->row();
        if (!$settings) {
            return false;
        }
        $this->title = $settings->app_name;
        $this->onesignal_appid = $settings->onesignal_appid;
        $this->onesignal_apikey = $settings->onesignal_apikey;
        $this->ready = true;
    }
    
    public function sendOneSignal($message, $notified_ids) {
        $this->init();
        if (!$this->ready || !$this->onesignal_appid || !$this->onesignal_apikey) {
            return false;
        }
        $uids = array_unique($notified_ids);
        $tags = array();
        foreach($uids as $notified_id){
            if(count($tags)){
                $tags[] = array('operator'=>'OR');
            }
            $tags[] = array('key'=>'user_id','relation'=>'=','value'=>$notified_id);
        }
        $payload = array(
            'app_id' => $this->onesignal_appid,
            'contents' => array('en'=>$message),
            'tags' => $tags
        );
        $headers = array();
        $headers[] = 'Content-Type: application/json';
        $headers[] = 'Authorization: Basic '.$this->onesignal_apikey;
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, ONESIGNAL_ENDPOINT);
        curl_setopt($ch, CURLOPT_POST, true);
        curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($payload));
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
        $result = curl_exec($ch);
        $httpcode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
        curl_close ($ch);
        
        return array(
            'httpcode' => $httpcode,
            'result' => $result
        );
    }

    public function sendGCM($body, $to) {
        $this->init();
        if (!$this->ready || !$this->gcm_key) {
            return false;
        }
        $headers = array('Authorization:key=' . $this->gcm_key, 'Content-Type:application/json');
        $fields = array(
            'notification' => array(
                'title' => $this->title,
                'body' => $body
            )
        );

        if (count($to) > 1) {
            $fields['registration_ids'] = $to;
        } else {
            $fields['to'] = $to[0];
        }
        $post = json_encode($fields);

        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, GCM_URL);
        curl_setopt($ch, CURLOPT_POST, true);
        curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
        curl_setopt($ch, CURLOPT_POSTFIELDS, $post);
        $result = curl_exec($ch);
        curl_close($ch);
        return $result;
    }

    public function sendAPNS($body, $tokens) {
        $this->init();
        if (!$this->ready) {
            return false;
        }

        if (!file_exists($this->certificate)) {
            return false;
        }

        clearstatcache();
        $certificateMod = substr(sprintf('%o', fileperms($this->certificate)), -3);
        if ($certificateMod > 644) {
            return false;
        }
        
        $aps['aps'] = array(
            'alert' => array(
                'title' => $this->title,
                'body' => $body,
            ),
            'sound' => 'default'
        );
        $payload = json_encode($aps);

        $ctx = stream_context_create();
        stream_context_set_option($ctx, 'ssl', 'local_cert', $this->certificate);
        if ($this->passphrase) {
            stream_context_set_option($ctx, 'ssl', 'passphrase', $this->passphrase);
        }
        $conn = stream_socket_client(APNS_URL, $error, $errorString, 100, STREAM_CLIENT_CONNECT | STREAM_CLIENT_PERSISTENT, $ctx);
        if (!$conn) {
            return false;
        }

        foreach ($tokens as $token) {
            if (strlen($token) == 64) {
                $msg = chr(0) . pack("n", 32) . pack('H*', $token) . pack("n", strlen($payload)) . $payload;
                $fwrite = fwrite($conn, $msg);
            }
        }

        fclose($conn);
    }

    public function getFeedbackService() {
        $this->init();
        if (!$this->ready) {
            return false;
        }

        if (!file_exists($this->certificate)) {
            return false;
        }

        clearstatcache();
        $certificateMod = substr(sprintf('%o', fileperms($this->certificate)), -3);
        if ($certificateMod > 644) {
            return false;
        }

        $ctx = stream_context_create();
        stream_context_set_option($ctx, 'ssl', 'local_cert', $this->certificate);
        if ($this->passphrase) {
            stream_context_set_option($ctx, 'ssl', 'passphrase', $this->passphrase);
        }
        $conn = stream_socket_client(APNS_FEEDBACK_URL, $error, $errorString, 60, STREAM_CLIENT_CONNECT | STREAM_CLIENT_PERSISTENT, $ctx);
        if (!$conn) {
            echo "ERROR $error: $errorString\n";
            exit;
        }
        $feedback_tokens = array();
        //and read the data on the connection:
        while (!feof($conn)) {
            $data = fread($conn, 38);
            if (strlen($data)) {
                $feedback_tokens[] = unpack("N1timestamp/n1length/H*devtoken", $data);
            }
        }
        fclose($conn);
        
        return $feedback_tokens;
    }

}

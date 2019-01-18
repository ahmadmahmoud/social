<?php
date_default_timezone_set("UTC");
    $now = new DateTime;
    $ago = new DateTime('2018-04-22 08:46:07');
    $diff = $now->diff($ago);
print_r($diff);
exit;
    $dt = 'الان';
    if($diff->y){
        $dt = $ago->format('i M, Y \\a\\t h:ia');
    }elseif($diff->m){
        $dt = $ago->format('i M \\a\\t h:ia');
    }elseif($diff->d){
        $dt = $ago->format('i M \\a\\t h:ia');
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
<?php
defined('BASEPATH') OR exit('No direct script access allowed');

/*
|--------------------------------------------------------------------------
| Display Debug backtrace
|--------------------------------------------------------------------------
|
| If set to TRUE, a backtrace will be displayed along with php errors. If
| error_reporting is disabled, the backtrace will not display, regardless
| of this setting
|
*/
defined('SHOW_DEBUG_BACKTRACE') OR define('SHOW_DEBUG_BACKTRACE', TRUE);

/*
|--------------------------------------------------------------------------
| File and Directory Modes
|--------------------------------------------------------------------------
|
| These prefs are used when checking and setting modes when working
| with the file system.  The defaults are fine on servers with proper
| security, but you may wish (or even need) to change the values in
| certain environments (Apache running a separate process for each
| user, PHP under CGI with Apache suEXEC, etc.).  Octal values should
| always be used to set the mode correctly.
|
*/
defined('FILE_READ_MODE')  OR define('FILE_READ_MODE', 0644);
defined('FILE_WRITE_MODE') OR define('FILE_WRITE_MODE', 0666);
defined('DIR_READ_MODE')   OR define('DIR_READ_MODE', 0755);
defined('DIR_WRITE_MODE')  OR define('DIR_WRITE_MODE', 0755);

/*
|--------------------------------------------------------------------------
| File Stream Modes
|--------------------------------------------------------------------------
|
| These modes are used when working with fopen()/popen()
|
*/
defined('FOPEN_READ')                           OR define('FOPEN_READ', 'rb');
defined('FOPEN_READ_WRITE')                     OR define('FOPEN_READ_WRITE', 'r+b');
defined('FOPEN_WRITE_CREATE_DESTRUCTIVE')       OR define('FOPEN_WRITE_CREATE_DESTRUCTIVE', 'wb'); // truncates existing file data, use with care
defined('FOPEN_READ_WRITE_CREATE_DESTRUCTIVE')  OR define('FOPEN_READ_WRITE_CREATE_DESTRUCTIVE', 'w+b'); // truncates existing file data, use with care
defined('FOPEN_WRITE_CREATE')                   OR define('FOPEN_WRITE_CREATE', 'ab');
defined('FOPEN_READ_WRITE_CREATE')              OR define('FOPEN_READ_WRITE_CREATE', 'a+b');
defined('FOPEN_WRITE_CREATE_STRICT')            OR define('FOPEN_WRITE_CREATE_STRICT', 'xb');
defined('FOPEN_READ_WRITE_CREATE_STRICT')       OR define('FOPEN_READ_WRITE_CREATE_STRICT', 'x+b');

/*
|--------------------------------------------------------------------------
| Exit Status Codes
|--------------------------------------------------------------------------
|
| Used to indicate the conditions under which the script is exit()ing.
| While there is no universal standard for error codes, there are some
| broad conventions.  Three such conventions are mentioned below, for
| those who wish to make use of them.  The CodeIgniter defaults were
| chosen for the least overlap with these conventions, while still
| leaving room for others to be defined in future versions and user
| applications.
|
| The three main conventions used for determining exit status codes
| are as follows:
|
|    Standard C/C++ Library (stdlibc):
|       http://www.gnu.org/software/libc/manual/html_node/Exit-Status.html
|       (This link also contains other GNU-specific conventions)
|    BSD sysexits.h:
|       http://www.gsp.com/cgi-bin/man.cgi?section=3&topic=sysexits
|    Bash scripting:
|       http://tldp.org/LDP/abs/html/exitcodes.html
|
*/
defined('EXIT_SUCCESS')        OR define('EXIT_SUCCESS', 0); // no errors
defined('EXIT_ERROR')          OR define('EXIT_ERROR', 1); // generic error
defined('EXIT_CONFIG')         OR define('EXIT_CONFIG', 3); // configuration error
defined('EXIT_UNKNOWN_FILE')   OR define('EXIT_UNKNOWN_FILE', 4); // file not found
defined('EXIT_UNKNOWN_CLASS')  OR define('EXIT_UNKNOWN_CLASS', 5); // unknown class
defined('EXIT_UNKNOWN_METHOD') OR define('EXIT_UNKNOWN_METHOD', 6); // unknown class member
defined('EXIT_USER_INPUT')     OR define('EXIT_USER_INPUT', 7); // invalid user input
defined('EXIT_DATABASE')       OR define('EXIT_DATABASE', 8); // database error
defined('EXIT__AUTO_MIN')      OR define('EXIT__AUTO_MIN', 9); // lowest automatically-assigned error code
defined('EXIT__AUTO_MAX')      OR define('EXIT__AUTO_MAX', 125); // highest automatically-assigned error code

defined('API_VER') OR define('API_VER', '1.0');
defined('APP_VER') OR define('APP_VER', '1.0');
defined('OS_ANDROID') OR define('OS_ANDROID', 'android');
defined('OS_IOS') OR define('OS_IOS', 'ios');
defined('POST_TEXT_LEN') OR define('POST_TEXT_LEN', 50);
defined('POST_LIMIT') OR define('POST_LIMIT', 10);
defined('LIMIT_RESULT') OR define('LIMIT_RESULT', 15);

defined('URL_AVATAR') OR define('URL_AVATAR', 'public/avatar/');
defined('URL_COVER') OR define('URL_COVER', 'public/cover/');

defined('UPLOAD_PATH_IMG') OR define('UPLOAD_PATH_IMG', "/var/www/html/social/public/imgs/");
defined('UPLOAD_PATH_VID') OR define('UPLOAD_PATH_VID', "/var/www/html/social/public/vids/");

defined('PASS_HASH_SALT') OR define('PASS_HASH_SALT', 's0ci@l');
defined('MSG_REGISTERATION_FAILED') OR define('MSG_REGISTERATION_FAILED', 'فشل في التسجيل');
defined('MSG_USER_BLOCK') OR define('MSG_USER_BLOCK', 'هذا المستخدم محجوب');
defined('MSG_LOGIN_SUCCESS') OR define('MSG_LOGIN_SUCCESS', 'Login Successfully');
defined('MSG_LOGIN_UDID') OR define('MSG_LOGIN_UDID', 'تعريف الجهاز مطلوب');
defined('MSG_LOGIN_DEVICE') OR define('MSG_LOGIN_DEVICE', 'معلومات الجهاز مطلوبة');
defined('MSG_APIKEY_MISSING') OR define('MSG_APIKEY_MISSING', 'مفقود مفتاح واجهة برمجة التطبيقات');
defined('MSG_APIKEY_WRONG') OR define('MSG_APIKEY_WRONG', 'خطأ في واجهة برمجة التطبيقات');
defined('MSG_USER_MISMATCH') OR define('MSG_USER_MISMATCH', 'عدم تطابق المستخدم');
defined('PROFILE_UPDATE_SUCCESS') OR define('PROFILE_UPDATE_SUCCESS', 'تحديث الملف الشخصي');
defined('PROFILE_UPDATE_FAILED') OR define('PROFILE_UPDATE_FAILED', 'فشل تحديث الملف الشخصي');
defined('METHOD_GET') OR define('METHOD_GET', 'GET');
defined('METHOD_POST') OR define('METHOD_POST', 'POST');
defined('MSG_REQUIRE_COVER') OR define('MSG_REQUIRE_COVER', 'صورة الغلاف مطلوبة');
defined('MSG_REQUIRE_AVATAR') OR define('MSG_REQUIRE_AVATAR', 'الصورة الرمزية مطلوبة');
defined('UPLOAD_PATH') OR define('UPLOAD_PATH', "/var/www/html/social/public/uploads/");
defined('UPLOAD_PATH_COVER') OR define('UPLOAD_PATH_COVER', "/var/www/html/social/public/cover/");
defined('MSG_COVER_SUCCESS') OR define('MSG_COVER_SUCCESS', 'تم تحميل صورة الغلاف بنجاح');
defined('MSG_REQUIRE_AVATAR') OR define('MSG_REQUIRE_AVATAR', 'الصورة الرمزية مطلوبة');
defined('UPLOAD_PATH_AVATAR') OR define('UPLOAD_PATH_AVATAR', "/var/www/html/social/public/avatar/");
defined('MSG_AVATAR_SUCCESS') OR define('MSG_AVATAR_SUCCESS', 'الصورة الرمزية تم تحميلها بنجاح');
defined('MSG_USERNAME_REQUIRED') OR define('MSG_USERNAME_REQUIRED', "اسم المستخدم مطلوب");
defined('MSG_USERNAME_TAKEN') OR define('MSG_USERNAME_TAKEN', "اسم المستخدم مسجل");
defined('MSG_USERNAME_INVALID') OR define('MSG_USERNAME_INVALID', "اسم مستخدم غير صالح");
defined('MSG_USERNAME_SUCCESS') OR define('MSG_USERNAME_SUCCESS', "اسم المستخدم تغير بنجاح");
defined('MSG_PARAM_INVALID') OR define('MSG_PARAM_INVALID', "Invalid Parameters");
defined('MSG_MEDIATYPE_EXISTS') OR define('MSG_MEDIATYPE_EXISTS', "نوع وسائل الاعلام الاجتماعية موجود بالفعل");
defined('MSG_INVALID_LINK') OR define('MSG_INVALID_LINK', "رابط غير صالح");
defined('MSG_LINK_SUCCESS') OR define('MSG_LINK_SUCCESS', "تمت إضافة الرابط بنجاح");
defined('MSG_LINK_ID_REQUIRE') OR define('MSG_LINK_ID_REQUIRE', "معرف الارتباط مطلوب");
defined('MSG_LINK_NOTFOUND') OR define('MSG_LINK_NOTFOUND', "الرابط غير موجود");
defined('MSG_LINK_DELETED') OR define('MSG_LINK_DELETED', "تم حذف الرابط");
defined('MSG_LINK_UPDATED') OR define('MSG_LINK_UPDATED', "تم تعديل الرابط");
defined('URL_ASSETS_PATH') OR define('URL_ASSETS_PATH', "public/assets/");
defined('MSG_ISO_REQUIRED') OR define('MSG_ISO_REQUIRED', "رمز البلد مطلوب");
defined('MSG_AGREEMENT_NOTFOUND') OR define('MSG_AGREEMENT_NOTFOUND', "الاتفاق غير موجود");

defined('MSG_TEXT_REQUIRED') OR define('MSG_TEXT_REQUIRED', "النص مطلوب");
defined('MSG_REQUIRE_POST') OR define('MSG_REQUIRE_POST', "النص أو ملف الوسائط مطلوب");
defined('MSG_POST_SUCCESS') OR define('MSG_POST_SUCCESS', "نشر بنجاح");
defined('MSG_PAGE_REQUIRED') OR define('MSG_PAGE_REQUIRED', "الصفحة مطلوبة");
defined('MSG_POSTID_REQUIRED') OR define('MSG_POSTID_REQUIRED', "معرف المشاركة مطلوب");
defined('MSG_POST_NOTOWNER') OR define('MSG_POST_NOTOWNER', "لا يمكنك تنفيذ هذا الإجراء على هذه المشاركة");
defined('MSG_POST_DELETED') OR define('MSG_POST_DELETED', "تم حذف المشاركة");
defined('URL_VID') OR define('URL_VID', "public/vids/");
defined('URL_IMG') OR define('URL_IMG', "public/imgs/");
defined('URL_BANNER') OR define('URL_BANNER', 'public/banners/');

defined('MSG_POST_NOTFOUND') OR define('MSG_POST_NOTFOUND', "المنشور غير موجودة");
defined('MSG_POST_LIKE') OR define('MSG_POST_LIKE', "تم الاعجاب ");
defined('MSG_POST_DISLIKE') OR define('MSG_POST_DISLIKE', "تم عدم الاعجاب");
defined('MSG_COMMENT_REQUIRED') OR define('MSG_COMMENT_REQUIRED', "التعليق مطلوب");
defined('UPLOAD_PATH_COMMENT') OR define('UPLOAD_PATH_COMMENT', "/var/www/html/social/public/comments/");
defined('MSG_COMMENT_SUCCESS') OR define('MSG_COMMENT_SUCCESS', "علق بنجاح");
defined('MSG_COMMENT_NOTFOUND') OR define('MSG_COMMENT_NOTFOUND', "التعليق غير موجود");
defined('MSG_COMMENT_NOTOWNER') OR define('MSG_COMMENT_NOTOWNER', "لا يمكنك تنفيذ هذا الإجراء على هذا التعليق");
defined('MSG_COMMENT_DELETED') OR define('MSG_COMMENT_DELETED', "التعليق المحذوفة");
defined('MSG_CAUSE_REQUIRED') OR define('MSG_CAUSE_REQUIRED', "السبب مطلوب");
defined('MSG_POST_REPORT') OR define('MSG_POST_REPORT', "تم التبليغ");

defined('URL_COMMENTS') OR define('URL_COMMENTS', "public/comments/");
defined('COMMENT_LIMIT') OR define('COMMENT_LIMIT', 10);

defined('POST_LIKE') OR define('POST_LIKE', 1);
defined('POST_DISLIKE') OR define('POST_DISLIKE', 2);
defined('POST_COMMENT') OR define('POST_COMMENT', 3);
defined('POST_DOWNLOAD') OR define('POST_DOWNLOAD', 4);
defined('POST_REPORT') OR define('POST_REPORT', 5);
defined('POST_VIEW') OR define('POST_VIEW', 6);
defined('POST_COPY') OR define('POST_COPY', 7);
defined('NOTIF_LIKE') OR define('NOTIF_LIKE', "[NAME] اعجب [POST]");
defined('NOTIF_DISLIKE') OR define('NOTIF_DISLIKE', "[NAME] لا يعجبه [POST]");
defined('NOTIF_COMMENT') OR define('NOTIF_COMMENT', "[NAME] علق على [POST]");
defined('NOTIF_DOWNLOAD') OR define('NOTIF_DOWNLOAD', "[NAME] حمل منشورك [POST]");
defined('NOTIF_REPORTED') OR define('NOTIF_REPORTED', "[BRIEF] بلغ عنه [COUNT] مرات");
defined('NOTIF_COPY') OR define('NOTIF_COPY', "[NAME] نسخ منشورك [POST]");
defined('NOTIF_ADMIN') OR define('NOTIF_ADMIN', '"[BRIEF]" تم حذفه من الادمن بسبب "[CAUSE]"');
defined('URL_ASSETS') OR define('URL_ASSETS', 'public/assets/');
defined('NOTIFICATIONS_LIMIT') OR define('NOTIFICATIONS_LIMIT', 10);

defined('MSG_RECEIVERID_REQUIRED') OR define('MSG_RECEIVERID_REQUIRED', "تعريف المستقبل مطلوب");
defined('MSG_RECEIVERID_NOTFOUND') OR define('MSG_RECEIVERID_NOTFOUND', "المستقبل غير موجود");
defined('UPLOAD_PATH_MSG') OR define('UPLOAD_PATH_MSG', "/var/www/html/social/public/messages/");
defined('MSG_MESSAGES_SUCCESS') OR define('MSG_MESSAGES_SUCCESS', "أرسلت بنجاح");
defined('MSG_CONVERSATION_NOTFOUND') OR define('MSG_CONVERSATION_NOTFOUND', "لم يتم العثور على المحادثة");
defined('MSG_CONVERSATION_DELETED') OR define('MSG_CONVERSATION_DELETED', "تم حذف المحادثة");
defined('CONVERSATIONS_LIMIT') OR define('CONVERSATIONS_LIMIT', 10);
defined('MSG_USER_NOTFOUND') OR define('MSG_USER_NOTFOUND', "المستخدم ليس موجود");
defined('MSG_PROFILEID_REQUIRED') OR define('MSG_PROFILEID_REQUIRED', "معرف الملف الشخصي مطلوب");
defined('MSG_JOKING_ERROR') OR define('MSG_JOKING_ERROR', "keef 7alak, ma abrad wejhak");
defined('MSG_TITLE_REQUIRED') OR define('MSG_TITLE_REQUIRED', "العنوان مطلوب");
defined('MSG_MESSAGE_REQUIRED') OR define('MSG_MESSAGE_REQUIRED', "الرسالة مطلوبة");
defined('MSG_CONTACTUS_SUCCESS') OR define('MSG_CONTACTUS_SUCCESS', "تم استلام رسالتك ، وسنوافيك بالرد قريبًا");
defined('URL_APPS_IMAGES') OR define('URL_APPS_IMAGES', "http://localhost/apps_images/");

defined('UPLOAD_PATH_PDF') OR define('UPLOAD_PATH_PDF', "/var/www/html/social/public/pdf/");
defined('URL_PDF') OR define('URL_PDF', 'public/pdf/');

defined('UPLOAD_PATH_THUMBS') OR define('UPLOAD_PATH_THUMBS', "/var/www/html/social/public/thumbs/");
defined('URL_THUMB') OR define('URL_THUMB', 'public/thumbs/');
defined('MSG_KEYWORD_FAILED') OR define('MSG_KEYWORD_FAILED', 'كلمة رئيسية غير صالحة');
defined('ERROR_PASSWORDS_DONT_MATCH') OR define('ERROR_PASSWORDS_DONT_MATCH', "كلمات المرور غير متطابقة");
/*
|--------------------------------------------------------------------------
| ADMIN
|--------------------------------------------------------------------------
|
| These modes are used for admin
|
*/

defined('ADMIN_COOKIENAME') OR define('ADMIN_COOKIENAME', 'appadmin');
defined('LOGIN_MAX_LOGIN_ATTEMPTS') OR define('LOGIN_MAX_LOGIN_ATTEMPTS', 10);
defined('LOGIN_FINGERPRINT') OR define('LOGIN_FINGERPRINT', true);
defined('ERROR_BRUTE_FORCE') OR define('ERROR_BRUTE_FORCE', "لقد تجاوزت محاولات تسجيل الدخول");
defined('PASSWORD_ENCRYPTION') OR define('PASSWORD_ENCRYPTION', "bcrypt");
defined('PASSWORD_BCRYPT_COST') OR define('PASSWORD_BCRYPT_COST', "13");
defined('PASSWORD_SHA512_ITERATIONS') OR define('PASSWORD_SHA512_ITERATIONS', 25000);
defined('PASSWORD_SALT') OR define('PASSWORD_SALT', "FjuWD9Ejv7dCFIh2WQtmFZ");
defined('ERROR_WRONG_USERNAME_PASSWORD') OR define('ERROR_WRONG_USERNAME_PASSWORD', "اسم المستخدم أو كلمة المرور غير صحيحة");
defined('BANNER_URL') OR define('BANNER_URL', 'public/banners/');

defined('GCM_URL') OR define('GCM_URL', 'https://fcm.googleapis.com/fcm/send');
defined('GCM_APIKEY') OR define('GCM_APIKEY', 'AAAA3jez5zM:APA91bG7yQT7vgWrUqv0YvmhvqqLqg63zMyl7POfQvEzdsZQPzU8m1cukWjsgV9Nu7Xjj0Ab6y_74f3JGxdpuWg1DQ318HLY8b0RqG1lUk9c3aRjc16oDvVfnZiS9QXHKXLRy189VoCO');

defined('APNS_URL') OR define('APNS_URL', 'ssl://gateway.sandbox.push.apple.com:2195');
defined('APNS_FEEDBACK_URL') OR define('APNS_FEEDBACK_URL', 'ssl://feedback.sandbox.push.apple.com:2196');
defined('APNS_PATH') OR define('APNS_PATH', "/var/www/html/social/assets/certificate/");
defined('MSG_REPORT_EXISTS') OR define('MSG_REPORT_EXISTS', "لقد تم التبليغ عن المنشور مسبقا");

defined('SESSION_LANG') OR define('SESSION_LANG', "AdminLang");
defined('URL_LOGO') OR define('URL_LOGO', 'public/logos/');
defined('MSG_LANG_UNKNOWN') OR define('MSG_LANG_UNKNOWN', 'لغة غير معروفة');

defined('ONESIGNAL_ENDPOINT') OR define('ONESIGNAL_ENDPOINT', 'https://onesignal.com/api/v1/notifications');
defined('MSG_USERID_DUPLICATE') OR define('MSG_USERID_DUPLICATE', "SenderId cannot equals ReceiverId");
defined('OTHERAPPS_URL') OR define('OTHERAPPS_URL', "http://otherapp.social-era.com");
defined('MSG_ACCOUNT_DELETE_SUCCESS') OR define('MSG_ACCOUNT_DELETE_SUCCESS', 'لقد تم حذف المستخدم بنجاح');
defined('MSG_ACCOUNT_DELETE_FAILED') OR define('MSG_ACCOUNT_DELETE_FAILED', 'لم يتم حذف المستخدم بنجاح');
defined('MSG_CHANGEUSERNAME_REVIEW') OR define('MSG_CHANGEUSERNAME_REVIEW', "تم اراسال الطلب, بانتظار موافقة المدير");
defined('MSG_CHANGEUSERNAME_DUPLICATE') OR define('MSG_CHANGEUSERNAME_DUPLICATE', "تم ارسال الطلب مسبقا");
defined('MSG_CHANGEUSERNAME_APPROVE') OR define('MSG_CHANGEUSERNAME_APPROVE', "تم تغيير اسم المستخدم الخاص بك");
defined('MSG_CHANGEUSERNAME_REJECT') OR define('MSG_CHANGEUSERNAME_REJECT', "تم رفض طلب تغيير اسم المستخدم الخاص بك");
defined('MSG_ALLOW_FORSALE') OR define('MSG_ALLOW_FORSALE', "لا يمكن اضافه منشور للبيع, الخدمة ليست متاحة");

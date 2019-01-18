<?php
defined('BASEPATH') OR exit('No direct script access allowed');

/*
| -------------------------------------------------------------------------
| URI ROUTING
| -------------------------------------------------------------------------
| This file lets you re-map URI requests to specific controller functions.
|
| Typically there is a one-to-one relationship between a URL string
| and its corresponding controller class/method. The segments in a
| URL normally follow this pattern:
|
|	example.com/class/method/id/
|
| In some instances, however, you may want to remap this relationship
| so that a different class/function is called than the one
| corresponding to the URL.
|
| Please see the user guide for complete details:
|
|	https://codeigniter.com/user_guide/general/routing.html
|
| -------------------------------------------------------------------------
| RESERVED ROUTES
| -------------------------------------------------------------------------
|
| There are three reserved routes:
|
|	$route['default_controller'] = 'welcome';
|
| This route indicates which controller class should be loaded if the
| URI contains no data. In the above example, the "welcome" class
| would be loaded.
|
|	$route['404_override'] = 'errors/page_missing';
|
| This route will tell the Router which controller/method to use if those
| provided in the URL cannot be matched to a valid route.
|
|	$route['translate_uri_dashes'] = FALSE;
|
| This is not exactly a route, but allows you to automatically route
| controller and method names that contain dashes. '-' isn't a valid
| class or method name character, so it requires translation.
| When you set this option to TRUE, it will replace ALL dashes in the
| controller and method URI segments.
|
| Examples:	my-controller/index	-> my_controller/index
|		my-controller/my-method	-> my_controller/my_method
*/
$route['default_controller'] = 'welcome';
$route['404_override'] = '';
$route['translate_uri_dashes'] = FALSE;

$route['api/welcome']['get'] = 'api/welcome';
$route['api/users/login']['post'] = 'api/users/auth_login';
$route['api/users/hello']['post'] = 'api/users/auth_hello';
$route['api/users/delete']['post'] = 'api/users/auth_delete';
$route['api/search']['post'] = 'api/posts/search';
$route['api/profile/updatecover']['post'] = 'api/profile/updateCover';
$route['api/profile/updateavatar']['post'] = 'api/profile/updateAvatar';
$route['api/profile/changeusername']['post'] = 'api/profile/changeUsername';

$route['api/agreement']['get'] = 'api/common/agreement';
$route['api/contactus']['post'] = 'api/profile/contactus';
$route['api/otherapps']['get'] = 'api/profile/otherapps';

$route['admin'] = 'admin/home';
$route['admin/login']['post'] = 'admin/home/login';
$route['admin/logout']['post'] = 'admin/home/logout';
$route['admin/settings/update']['post'] = 'admin/settings/update';
$route['admin/settings/password']['post'] = 'admin/settings/password';
$route['admin/banners/new']['get'] = 'admin/banners/create';
$route['admin/banners/([0-9]+)']['get'] = 'admin/banners/edit/$1';

$route['admin/users/([0-9]+)']['get'] = 'admin/users/view/$1';

$route['admin/exportdata']['get'] = 'admin/home/export';
$route['admin/otherapps']['get'] = 'admin/home/otherapps';
$route['admin/changelang']['post'] = 'admin/home/changelang';
$route['admin/timezone']['post'] = 'admin/home/timezone';
$route['admin/requests/reject']['post'] = 'admin/requests/reject';
$route['admin/requests/approve']['post'] = 'admin/requests/approve';


<?php
defined('BASEPATH') OR exit('No direct script access allowed');
$csrf = array(
    'name' => $this->security->get_csrf_token_name(),
    'hash' => $this->security->get_csrf_hash()
);
$gender = "Unspecified";
if ($user->gender == 1) {
    $gender = "Male";
} elseif ($user->gender == 2) {
    $gender = "Female";
}
$adminlang = $this->session->userdata(SESSION_LANG);
$direction = $adminlang['dir'];
?>
<div class="content-heading" dir="<?php echo $direction;?>">
    <!-- .app-content-inner -->
    <div class="app-content-inner">
        <!-- .content-breadcrumb -->
        <ol class="content-breadcrumb breadcrumb breadcrumb-arrow">
            <li><a href="<?php echo $this->config->item('admin_url'); ?>"><i class="icon-home mr-1"></i> <?php echo $this->lang->line('section_home');?></a></li>
            <li><a href="<?php echo $this->config->item('admin_url'); ?>users"><?php echo $this->lang->line('section_users');?></a></li>
            <li class="active"><?php echo $this->lang->line('label_view');?></li>
        </ol>
        <!-- /.content-breadcrumb -->
    </div>
    <!-- /.app-content-inner -->
</div>
<div class="app-content-inner">
    <div class="row">
        <div class="col-xs-12 col-sm-6" dir="<?php echo $direction;?>">
            <div class="panel">
                <form class="form-compound">
                    <h3 class="form-section-heading"><?php echo $this->lang->line('label_information');?></h3>
                    <div class="form-section">

                        <div class="form-group">
                            <div class="col-xs-12 col-sm-6">
                                <label class="control-label" for="username"><?php echo $this->lang->line('label_username');?></label>
                                <input type="text" class="form-control bg_white" id="username" required="" name="username" value="<?php echo $user->username; ?>" disabled="disabled">
                            </div>
                            <div class="col-xs-12 col-sm-6">
                                <label class="control-label" for="email"><?php echo $this->lang->line('label_email');?></label>
                                <input type="text" class="form-control bg_white" id="email" required="" name="email" value="<?php echo $user->email; ?>" disabled="disabled">
                            </div>
                        </div>

                        <div class="form-group">
                            <div class="col-xs-12 col-sm-6">
                                <label class="control-label" for="created"><?php echo $this->lang->line('label_created_at');?></label>
                                <input type="text" class="form-control bg_white" id="created" required="" name="created" value="<?php echo $user->created; ?>" disabled="disabled">
                            </div>
                            <div class="col-xs-12 col-sm-6">
                                <label class="control-label" for="lastupdate"><?php echo $this->lang->line('label_last_update');?></label>
                                <input type="text" class="form-control bg_white" id="lastupdate" required="" name="lastupdate" value="<?php echo $user->lastupdate; ?>" disabled="disabled">
                            </div>
                        </div>

                        <div class="form-group">
                            <div class="col-xs-12 col-sm-4">
                                <label class="control-label" for="age"><?php echo $this->lang->line('label_age');?></label>
                                <input type="text" class="form-control bg_white" id="age" required="" name="age" value="<?php echo $user->age; ?>" disabled="disabled">
                            </div>
                            <div class="col-xs-12 col-sm-4">
                                <label class="control-label" for="phone"><?php echo $this->lang->line('label_phone');?></label>
                                <input type="text" class="form-control bg_white" id="phone" required="" name="phone" value="<?php echo $user->phone; ?>" disabled="disabled">
                            </div>
                            <div class="col-xs-12 col-sm-4">
                                <label class="control-label" for="gender"><?php echo $this->lang->line('label_gender');?></label>
                                <input type="text" class="form-control bg_white" id="gender" required="" name="gender" value="<?php echo $gender; ?>" disabled="disabled">
                            </div>
                        </div>

                        <div class="form-group">
                            <div class="col-xs-12 col-sm-12">
                                <label class="control-label" for="about"><?php echo $this->lang->line('label_about');?></label>
                                <textarea class="form-control bg_white" id="about" required="" name="about" disabled="disabled"><?php echo $user->about; ?></textarea>
                            </div>
                        </div>

                        <div class="form-group">
                            <div class="col-xs-12 col-sm-3">
                                <div class="col-xs-12 col-sm-12">
                                    <label class="control-label" for="logo"><?php echo $this->lang->line('label_logo');?></label>
                                </div>
                                <div class="col-xs-12 col-sm-12">
                                    <a data-fancybox="group" href="<?php echo base_url() . URL_AVATAR . $user->avatar; ?>">
                                        <img style="width:100%" src="<?php echo base_url() . URL_AVATAR . $user->avatar; ?>">
                                    </a>
                                </div>
                            </div>
                            <div class="col-xs-12 col-sm-9">
                                <div class="col-xs-12 col-sm-12">
                                    <label class="control-label" for="cover"><?php echo $this->lang->line('label_cover');?></label>
                                </div>
                                <div class="col-xs-12 col-sm-12">
                                    <a data-fancybox="group" href="<?php echo base_url() . URL_COVER . $user->cover; ?>">
                                        <img style="width:100%" src="<?php echo base_url() . URL_COVER . $user->cover; ?>">
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <h3 class="form-section-heading"><?php echo $this->lang->line('label_device');?></h3>
                    <div class="form-section">

                        <div class="form-group">
                            <div class="col-xs-12 col-sm-4">
                                <label class="control-label" for="os"><?php echo $this->lang->line('label_os');?></label>
                                <input type="text" class="form-control bg_white" id="os" required="" name="os" value="<?php echo $user->os; ?>" disabled="disabled">
                            </div>
                            <div class="col-xs-12 col-sm-4">
                                <label class="control-label" for="os_ver"><?php echo $this->lang->line('label_os_version');?></label>
                                <input type="text" class="form-control bg_white" id="os_ver" required="" name="os_ver" value="<?php echo $user->os_ver; ?>" disabled="disabled">
                            </div>
                            <div class="col-xs-12 col-sm-4">
                                <label class="control-label" for="app_ver"><?php echo $this->lang->line('label_app_version');?></label>
                                <input type="text" class="form-control bg_white" id="app_ver" required="" name="app_ver" value="<?php echo $user->app_ver; ?>" disabled="disabled">
                            </div>
                        </div>

                        <div class="form-group">
                            <div class="col-xs-12 col-sm-6">
                                <label class="control-label" for="udid"><?php echo $this->lang->line('label_udid');?></label>
                                <input type="text" class="form-control bg_white" id="udid" required="" name="udid" value="<?php echo $user->udid; ?>" disabled="disabled">
                            </div>
                            <div class="col-xs-12 col-sm-6">
                                <label class="control-label" for="model"><?php echo $this->lang->line('label_model');?></label>
                                <input type="text" class="form-control bg_white" id="model" required="" name="model" value="<?php echo $user->model; ?>" disabled="disabled">
                            </div>
                        </div>

                        <div class="form-group">
                            <div class="col-xs-12 col-sm-12">
                                <label class="control-label" for="token"><?php echo $this->lang->line('label_token');?></label>
                                <textarea class="form-control bg_white" id="token" required="" name="token" disabled="disabled"><?php echo $user->token; ?></textarea>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
        <div class="col-xs-12 col-sm-6">
            <div class="panel">
                <form class="form-compound">
                    <h3 class="form-section-heading" dir="<?php echo $direction;?>"><?php echo $this->lang->line('label_social_media_links');?></h3>
                    <div class="form-section">
                        <div class="table-responsive">
                            <table class="table table-striped">
                                <thead>
                                    <tr>
                                        <th><?php echo $this->lang->line('label_name');?></th>
                                        <th><?php echo $this->lang->line('label_link');?></th>
                                        <th><?php echo $this->lang->line('label_date');?></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <?php foreach ($links as $link): ?>
                                        <tr>
                                            <td><img src="<?php echo base_url() . 'public/assets/' . $link->icon; ?>" style="width: 24px;margin-right:6px" /> <?php echo $link->name; ?></td>
                                            <td><a href="<?php echo $link->link; ?>" target="_blank"><?php echo $link->link; ?></a></td>
                                            <td><?php echo $link->created; ?></td>
                                        </tr>
                                    <?php endforeach; ?>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <h3 class="form-section-heading" dir="<?php echo $direction;?>"><?php echo $this->lang->line('label_statistics');?></h3>
                    <div class="form-section" dir="<?php echo $direction;?>">

                        <div class="form-group">
                            <div class="col-xs-12 col-sm-3">
                                <label class="control-label" for="posts"><?php echo $this->lang->line('section_posts');?></label>
                                <input type="text" class="form-control bg_white" id="posts" required="" name="posts" value="<?php echo $user->posts; ?>" disabled="disabled">
                            </div>
                            <div class="col-xs-12 col-sm-3">
                                <label class="control-label" for="images"><?php echo $this->lang->line('label_images');?></label>
                                <input type="text" class="form-control bg_white" id="images" required="" name="images" value="<?php echo $user->images; ?>" disabled="disabled">
                            </div>
                            <div class="col-xs-12 col-sm-3">
                                <label class="control-label" for="gifs"><?php echo $this->lang->line('label_gifs');?></label>
                                <input type="text" class="form-control bg_white" id="gifs" required="" name="gifs" value="<?php echo $user->gifs; ?>" disabled="disabled">
                            </div>
                            <div class="col-xs-12 col-sm-3">
                                <label class="control-label" for="videos"><?php echo $this->lang->line('label_videos');?></label>
                                <input type="text" class="form-control bg_white" id="videos" required="" name="videos" value="<?php echo $user->videos; ?>" disabled="disabled">
                            </div>
                        </div>

                        <div class="form-group">
                            <div class="col-xs-12 col-sm-4">
                                <label class="control-label" for="views"><?php echo $this->lang->line('label_views');?></label>
                                <input type="text" class="form-control bg_white" id="views" required="" name="views" value="<?php echo $user->views; ?>" disabled="disabled">
                            </div>
                            <div class="col-xs-12 col-sm-4">
                                <label class="control-label" for="comments"><?php echo $this->lang->line('label_comments');?></label>
                                <input type="text" class="form-control bg_white" id="comments" required="" name="comments" value="<?php echo $user->comments; ?>" disabled="disabled">
                            </div>
                            <div class="col-xs-12 col-sm-4">
                                <label class="control-label" for="reports"><?php echo $this->lang->line('section_reports');?></label>
                                <input type="text" class="form-control bg_white" id="reports" required="" name="reports" value="<?php echo $user->reports; ?>" disabled="disabled">
                            </div>
                        </div>

                        <div class="form-group">
                            <div class="col-xs-12 col-sm-4">
                                <label class="control-label" for="likes"><?php echo $this->lang->line('label_likes');?></label>
                                <input type="text" class="form-control bg_white" id="likes" required="" name="likes" value="<?php echo $user->likes; ?>" disabled="disabled">
                            </div>
                            <div class="col-xs-12 col-sm-4">
                                <label class="control-label" for="dislikes"><?php echo $this->lang->line('label_dislikes');?></label>
                                <input type="text" class="form-control bg_white" id="dislikes" required="" name="dislikes" value="<?php echo $user->dislikes; ?>" disabled="disabled">
                            </div>
                            <div class="col-xs-12 col-sm-4">
                                <label class="control-label" for="downloads"><?php echo $this->lang->line('label_downloads');?></label>
                                <input type="text" class="form-control bg_white" id="downloads" required="" name="downloads" value="<?php echo $user->downloads; ?>" disabled="disabled">
                            </div>
                        </div>

                    </div>

                    <h3 class="form-section-heading" dir="<?php echo $direction;?>"><?php echo $this->lang->line('label_account');?></h3>
                    <div class="form-section" dir="<?php echo $direction;?>">

                        <div class="form-group">
                            <div class="col-xs-12 col-sm-12">
                                <?php if($user->active){?>
                                <button type="button" class="btn btn-danger deactivateuser" uid="<?php echo $user->id;?>" csrf_token="<?php echo $csrf['hash']; ?>"><?php echo $this->lang->line('label_deactivate');?></button>
                                <?php }else{?>
                                <button type="button" class="btn btn-success activateuser" uid="<?php echo $user->id;?>" csrf_token="<?php echo $csrf['hash']; ?>"><?php echo $this->lang->line('label_activate');?></button>
                                <?php }?>
                            </div>
                        </div>

                    </div>
                </form>
            </div>
        </div>
    </div>
</div>
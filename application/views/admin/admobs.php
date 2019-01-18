<?php
defined('BASEPATH') OR exit('No direct script access allowed');
$csrf = array(
    'name' => $this->security->get_csrf_token_name(),
    'hash' => $this->security->get_csrf_hash()
);
if(!$admobs){
    $admobs = new stdClass();
    $admobs->id = 0;
    $admobs->android = "";
    $admobs->ios = "";
    $admobs->allposts = 0;
    $admobs->mostviewed = 0;
    $admobs->chat = 0;
    $admobs->messages = 0;
    $admobs->settings = 0;
    $admobs->profile = 0;
    $admobs->notifications = 0;
}
$adminlang = $this->session->userdata(SESSION_LANG);
$direction = $adminlang['dir'];
?>
<div class="content-heading" dir="<?php echo $direction;?>">
    <div class="app-content-inner">
        <ol class="content-breadcrumb breadcrumb breadcrumb-arrow">
            <li><a href="<?php echo $this->config->item('admin_url'); ?>"><i class="icon-home mr-1"></i> <?php echo $this->lang->line('label_home');?></a></li>
            <li class="active"><?php echo $this->lang->line('label_admobs');?></li>
        </ol>
    </div>
</div>
<div class="app-content-inner" dir="<?php echo $direction;?>">
    <div class="row">
        <?php if($direction === 'rtl'){?>
        <div class="col-xs-12 col-sm-5"></div>
        <?php }?>
        <div class="col-xs-12 col-sm-7">
            <div class="panel">
                <form class="form-compound" id="formadmobs" name="formadmobs" method="POST">
                    <h3 class="form-section-heading"><?php echo $this->lang->line('label_admobs');?></h3>
                    <div class="form-section">
                        <div class="form-group">
                            <div class="col-xs-12 col-sm-12">
                                <label class="control-label" for="admobs_android"><abbr title="required">*</abbr> Android</label>
                                <input type="text" class="form-control" id="admobs_android" name="admobs_android" value="<?php echo $admobs->android; ?>" disabled="disabled">
                            </div>
                        </div>
                        <div class="form-group">
                            <div class="col-xs-12 col-sm-12">
                                <label class="control-label" for="admobs_ios"><abbr title="required">*</abbr> iOS</label>
                                <input type="text" class="form-control" id="admobs_ios" name="admobs_ios" value="<?php echo $admobs->ios; ?>" disabled="disabled">
                            </div>
                        </div>
                    </div>
                    <h3 class="form-section-heading"><?php echo $this->lang->line('label_enable_admobs');?></h3>
                    <div class="form-section">
                        <div class="form-group">
                            <div class="col-xs-12 col-sm-4">
                                <input class="magic-checkbox" type="checkbox" name="admobs_allposts" id="admobs_allposts"<?php
                                if ($admobs->allposts) {
                                    echo ' checked="checked"';
                                }
                                ?>>
                                <label class="pull-left" for="admobs_allposts"></label>
                                <label class="pull-left text" for="admobs_allposts"><?php echo $this->lang->line('label_all_posts');?></label>
                            </div>
                            <div class="col-xs-12 col-sm-4">
                                <input class="magic-checkbox" type="checkbox" name="admobs_mostviewed" id="admobs_mostviewed"<?php
                                if ($admobs->mostviewed) {
                                    echo ' checked="checked"';
                                }
                                ?>>
                                <label class="pull-left" for="admobs_mostviewed"></label>
                                <label class="pull-left text" for="admobs_mostviewed"><?php echo $this->lang->line('label_most_viewed');?></label>
                            </div>
                            <div class="col-xs-12 col-sm-4">
                                <input class="magic-checkbox" type="checkbox" name="admobs_messages" id="admobs_messages"<?php
                                if ($admobs->messages) {
                                    echo ' checked="checked"';
                                }
                                ?>>
                                <label class="pull-left" for="admobs_messages"></label>
                                <label class="pull-left text" for="admobs_messages"><?php echo $this->lang->line('label_messages');?></label>
                            </div>
                        </div>
                        <div class="form-group">
                            <div class="col-xs-12 col-sm-4">
                                <input class="magic-checkbox" type="checkbox" name="admobs_chat" id="admobs_chat"<?php
                                if ($admobs->chat) {
                                    echo ' checked="checked"';
                                }
                                ?>>
                                <label class="pull-left" for="admobs_chat"></label>
                                <label class="pull-left text" for="admobs_chat"><?php echo $this->lang->line('label_chat');?></label>
                            </div>
                            <div class="col-xs-12 col-sm-4">
                                <input class="magic-checkbox" type="checkbox" name="admobs_notifications" id="admobs_notifications"<?php
                                if ($admobs->notifications) {
                                    echo ' checked="checked"';
                                }
                                ?>>
                                <label class="pull-left" for="admobs_notifications"></label>
                                <label class="pull-left text" for="admobs_notifications"><?php echo $this->lang->line('label_notifications');?></label>
                            </div>
                            <div class="col-xs-12 col-sm-4">
                                <input class="magic-checkbox" type="checkbox" name="admobs_profile" id="admobs_profile"<?php
                                if ($admobs->profile) {
                                    echo ' checked="checked"';
                                }
                                ?>>
                                <label class="pull-left" for="admobs_profile"></label>
                                <label class="pull-left text" for="admobs_profile"><?php echo $this->lang->line('label_profile');?></label>
                            </div>
                        </div>
                        <div class="form-group">
                            <div class="col-xs-12 col-sm-12">
                                <input class="magic-checkbox" type="checkbox" name="admobs_settings" id="admobs_settings"<?php
                                if ($admobs->settings) {
                                    echo ' checked="checked"';
                                }
                                ?>>
                                <label class="pull-left" for="admobs_settings"></label>
                                <label class="pull-left text" for="admobs_settings"><?php echo $this->lang->line('label_settings');?></label>
                            </div>
                        </div>
                    </div>

                    <div class="form-actions">
                        <button type="submit" class="btn btn-success" id="saveadmobs"><?php echo $this->lang->line('label_save');?></button>
                    </div>
                    <input type="hidden" name="<?php echo $csrf['name']; ?>" id="<?php echo $csrf['name']; ?>" value="<?php echo $csrf['hash']; ?>">
                    <input type="hidden" name="admobs_id" id="admobs_id" value="<?php echo $admobs->id; ?>">
                </form>
            </div>
        </div>
    </div>
</div>
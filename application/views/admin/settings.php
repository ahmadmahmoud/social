<?php
defined('BASEPATH') OR exit('No direct script access allowed');
$csrf = array(
    'name' => $this->security->get_csrf_token_name(),
    'hash' => $this->security->get_csrf_hash()
);
$adminlang = $this->session->userdata(SESSION_LANG);
$direction = $adminlang['dir'];

$timezones = array(
    '-12:00','-11:00','-10:00','-09:30','-09:00','-08:00','-07:00','-06:00',
    '-05:00','-04:00','-03:30','-03:00','-02:00','-01:00','+00:00',
    '+01:00','+02:00','+03:00','+03:30','+04:00','+04:30','+05:00','+05:30',
    '+05:45','+06:00','+06:30','+07:00','+08:00','+08:45','+09:00','+09:30',
    '+10:00','+10:30','+11:00','+12:00','+12:45','+13:00','+14:00'
);
$current_timezone = $settings->timezone;
?>
<div class="content-heading" dir="<?php echo $direction; ?>">
    <div class="app-content-inner">
        <ol class="content-breadcrumb breadcrumb breadcrumb-arrow">
            <li><a href="<?php echo $this->config->item('admin_url'); ?>"><i class="icon-home mr-1"></i> <?php echo $this->lang->line('label_home'); ?></a></li>
            <li class="active"><?php echo $this->lang->line('label_settings'); ?></li>
        </ol>
    </div>
</div>
<div class="app-content-inner" dir="<?php echo $direction; ?>">
    <div class="row">
        <div class="col-xs-12 col-sm-7">
            <div class="panel">
                <form class="form-compound" id="formsettings" name="formsettings" method="POST">
                    <h3 class="form-section-heading"><?php echo $this->lang->line('label_update_settings'); ?></h3>
                    <div class="form-section">

                        <div class="row">
                            <div class="col-xs-12 col-sm-6">
                                <div class="form-group">
                                    <div class="col-xs-12 col-sm-12">
                                        <label class="control-label" for="app_name"><abbr title="required">*</abbr> <?php echo $this->lang->line('label_app_name'); ?></label>
                                        <input type="text" class="form-control" id="app_name" name="app_name" value="<?php echo $settings->app_name; ?>" disabled="disabled">
                                    </div>
                                </div>
                            </div>
                            <div class="col-xs-12 col-sm-6">
                                <div class="form-group">
                                    <div class="col-xs-12 col-sm-12">
                                        <input class="magic-checkbox" type="checkbox" name="allow_post" id="allow_post" value="" <?php if ($settings->allow_post) {
    echo 'checked="checked"';
} ?>>
                                        <label class="pull-left" for="allow_post"></label>
                                        <label class="pull-left text" for="allow_post"><?php echo $this->lang->line('label_allow_posting'); ?></label>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <div class="col-xs-12 col-sm-12">
                                        <input class="magic-checkbox" type="checkbox" name="allow_comment" id="allow_comment" value="" <?php if ($settings->allow_comment) {
    echo 'checked="checked"';
} ?>>
                                        <label class="pull-left" for="allow_comment"></label>
                                        <label class="pull-left text" for="allow_comment"><?php echo $this->lang->line('label_allow_commenting'); ?></label>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <div class="col-xs-12 col-sm-12">
                                        <input class="magic-checkbox" type="checkbox" name="allow_forsale" id="allow_forsale" value="" <?php if ($settings->allow_forsale) {
    echo 'checked="checked"';
} ?>>
                                        <label class="pull-left" for="allow_forsale"></label>
                                        <label class="pull-left text" for="allow_forsale"><?php echo $this->lang->line('label_allow_forsale'); ?></label>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="row">
                            <div class="form-group">
                                <div class="col-xs-12 col-sm-6">
                                    <label class="control-label" for="users"><abbr title="required">*</abbr> <?php echo $this->lang->line('label_timezone'); ?></label>
                                    <select class="form-control" id="timezone" name="timezone">
                                        <?php 
                                            foreach($timezones as $timezone){
                                                $selected = ($current_timezone == $timezone) ? " selected='selected'" : '';
                                        ?>
                                        <option value="<?php echo $timezone;?>"<?php echo $selected;?>><?php echo $timezone;?></option>
                                        <?php }?>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div class="form-actions">
                            <button type="submit" class="btn btn-success" id="saveinfo"><?php echo $this->lang->line('label_save'); ?></button>
                        </div>

                    </div>
                    <input type="hidden" name="<?php echo $csrf['name']; ?>" id="<?php echo $csrf['name']; ?>" value="<?php echo $csrf['hash']; ?>">
                </form>
            </div>
        </div>
        <div class="col-xs-12 col-sm-5">
            <div class="panel">
                <form class="form-compound" id="formadminpwd" name="formadminpwd" novalidate autocomplete="off">
                    <h3 class="form-section-heading"><?php echo $this->lang->line('label_change_password'); ?></h3>
                    <div class="form-section">
                        <div class="form-group">
                            <div class="col-xs-12">
                                <input id="curpwd" name="curpwd" type="password" class="form-control" placeholder="<?php echo $this->lang->line('label_current_password'); ?>" value="">
                            </div>
                        </div>
                        <div class="form-group">
                            <div class="col-xs-12">
                                <input id="newpwd" name="newpwd" type="password" class="form-control" placeholder="<?php echo $this->lang->line('label_new_password'); ?>" value="">
                            </div>
                        </div>
                        <div class="form-group">
                            <div class="col-xs-12">
                                <input id="retpwd" name="retpwd" type="password" class="form-control" placeholder="<?php echo $this->lang->line('label_confirm_password'); ?>" value="">
                            </div>
                        </div>
                        <div class="form-actions">
                            <div class="form-actions-right">
                                <button type="submit" class="btn btn-success" id="btnadminpass" data-loading-text="<i class='fa fa-spinner fa-spin fa-lg fa-fw' style='color:#FFF'></i>"><?php echo $this->lang->line('label_save'); ?></button>
                            </div>
                        </div>
                    </div>
                    <input type="hidden" name="<?php echo $csrf['name']; ?>" id="<?php echo $csrf['name']; ?>" value="<?php echo $csrf['hash']; ?>">
                </form>
            </div>
        </div>
    </div>
</div>
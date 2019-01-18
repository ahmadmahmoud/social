<?php
defined('BASEPATH') OR exit('No direct script access allowed');
$csrf = array(
    'name' => $this->security->get_csrf_token_name(),
    'hash' => $this->security->get_csrf_hash()
);
$adminlang = $this->session->userdata(SESSION_LANG);
$direction = $adminlang['dir'];
?>
<div class="content-heading" dir="<?php echo $direction; ?>">
    <div class="app-content-inner">
        <ol class="content-breadcrumb breadcrumb breadcrumb-arrow">
            <li><a href="<?php echo $this->config->item('admin_url'); ?>"><i class="icon-home mr-1"></i> <?php echo $this->lang->line('label_home'); ?></a></li>
            <li class="active"><?php echo $this->lang->line('label_otherapps'); ?></li>
        </ol>
    </div>
</div>

<div class="app-content-inner">
    <div class="content-section">
        <div class="row">
            <div id="columns" data-columns>
                <?php foreach ($apps as $row) { ?>
                    <div class="thumbnail">
                        <div class="thumbnail-heading panel-heading text-center"><?php echo $row->name; ?></div>
                        <div><img src="<?php echo $row->logo; ?>" alt="" style="width:100%"></div>
                        <div class="thumbnail-extra">
                            <ul class="list-inline">
                                <li><a target="_blank" href="<?php echo $row->apple_store_url;?>" class="text-muted"><i class="fa fa-apple"></i></a></li>
                                <li><a target="_blank" href="<?php echo $row->google_play_url;?>" class="text-muted"><i class="fa fa-google"></i></a></li>
                            </ul>
                        </div>
                    </div>
                <?php } ?>
            </div>
        </div>
    </div>
</div>
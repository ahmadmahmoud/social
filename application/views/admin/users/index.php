<?php
defined('BASEPATH') OR exit('No direct script access allowed');
$csrf = array(
    'name' => $this->security->get_csrf_token_name(),
    'hash' => $this->security->get_csrf_hash()
);
$adminlang = $this->session->userdata(SESSION_LANG);
$direction = $adminlang['dir'];
?>
<div class="content-heading" dir="<?php echo $direction;?>">
    <div class="app-content-inner">
        <ol class="content-breadcrumb breadcrumb breadcrumb-arrow">
            <li><a href="<?php echo $this->config->item('admin_url'); ?>"><i class="icon-home mr-1"></i> <?php echo $this->lang->line('section_home');?></a></li>
            <li class="active"><?php echo $this->lang->line('section_users');?></li>
        </ol>
    </div>
</div>
<div class="app-content-inner" id="supportpage">
    <h3 class="page-header" dir="<?php echo $direction;?>"><?php echo $this->lang->line('section_users');?></h3>
    <div class="content-section">
        <div class="panel panel-default">
            <div class="table-responsive">
                <table id="table" class="table table-hover table-striped nowrap" width="100%">
                    <thead>
                        <tr>
                            <th><?php echo $this->lang->line('label_id');?></th>
                            <th><?php echo $this->lang->line('label_username');?></th>
                            <th><?php echo $this->lang->line('label_device');?></th>
                            <th><?php echo $this->lang->line('label_created_at');?></th>
                            <th><?php echo $this->lang->line('label_last_update');?></th>
                            <th><?php echo $this->lang->line('label_stats');?></th>
                            <th class="text-center"><?php echo $this->lang->line('label_active');?></th>
                            <th class="text-center"><?php echo $this->lang->line('label_view');?></th>
                        </tr>
                    </thead>
                    <tbody>
                        <?php foreach ($users as $row): ?>
                            <tr>
                                <td><?php echo $row->id; ?></td>
                                <td><?php echo $row->username; ?></td>
                                <td><?php echo $row->os; ?></td>
                                <td><span ts="<?php echo $row->created_ts; ?>" class="user_ts"><?php echo $row->created; ?></span></td>
                                <td><span ts="<?php echo $row->lastupdate; ?>" class="user_lastupdate"><?php echo $row->lastupdate; ?></span></td>
                                <td>
                                    <div class="thumbnail-extra">
                                        <ul class="list-inline">
                                            <li><a class="text-muted"><i class="fa fa-eye"></i> <?php echo $row->views;?></a></li>
                                            <li><a class="text-muted"><i class="fa fa-heart"></i> <?php echo $row->likes;?></a></li>
                                            <li><a class="text-muted"><i class="fa fa-heartbeat"></i> <?php echo $row->dislikes;?></a></li>
                                            <li><a class="text-muted"><i class="fa fa-comments"></i> <?php echo $row->comments;?></a></li>
                                            <li><a class="text-muted"><i class="fa fa-list-alt"></i> <?php echo $row->reports;?></a></li>
                                            <li><a class="text-muted"><i class="fa fa-download"></i> <?php echo $row->downloads;?></a></li>
                                        </ul>
                                    </div>
                                </td>

                                <td class="text-center">
                                    <?php if ($row->active) { ?>
                                        <div class="form-group">
                                            <i class="fa fa-check deactivateuser" aria-hidden="true" csrf_token="<?php echo $csrf['hash']; ?>" uid="<?php echo $row->id; ?>" style="color: #04c4a5;cursor: pointer"></i>
                                        </div>
                                    <?php } else { ?>
                                        <div class="form-group">
                                            <i class="fa fa-times activateuser" aria-hidden="true" csrf_token="<?php echo $csrf['hash']; ?>" uid="<?php echo $row->id; ?>" style="color: #c56c6c;cursor: pointer"></i>
                                        </div>
                                    <?php } ?>
                                </td>
                                <td class="text-center"><i class="fa fa-eye" aria-hidden="true" style="cursor: pointer" onclick="window.location='<?php echo $this->config->item('admin_url') . 'users/' . $row->id; ?>';"></i></td>
                            </tr>
                        <?php endforeach; ?>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</div>
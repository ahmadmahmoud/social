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
            <li><a href="<?php echo $this->config->item('admin_url'); ?>"><i class="icon-home mr-1"></i> <?php echo $this->lang->line('label_home');?></a></li>
            <li class="active"><?php echo $this->lang->line('section_messages');?></li>
        </ol>
    </div>
</div>
<div class="app-content-inner">
    <h3 class="page-header" dir="<?php echo $direction;?>"><?php echo $this->lang->line('section_messages');?></h3>
    <div class="content-section">
        <div class="panel panel-default">
            <div class="table-responsive">
                <table id="table" class="table table-hover table-striped nowrap" width="100%">
                    <thead>
                        <tr>
                            <th><?php echo $this->lang->line('label_id');?></th>
                            <th><?php echo $this->lang->line('label_from');?></th>
                            <th><?php echo $this->lang->line('label_to');?></th>
                            <th><?php echo $this->lang->line('label_date');?></th>
                            <th class="text-center"><?php echo $this->lang->line('label_view');?></th>
                        </tr>
                    </thead>
                    <tbody>
                        <?php foreach ($messages as $row): ?>
                            <tr>
                                <td><?php echo $row->id; ?></td>
                                <td><?php echo $row->username1; ?></td>
                                <td><?php echo $row->username2; ?></td>
                                <td><?php echo $row->created; ?></td>
                                <td class="text-center">
                                    <div class="form-group">
                                        <button csrf_token="<?php echo $csrf['hash']; ?>" mid="<?php echo $row->id; ?>" type="button" class="viewmessage btn btn-compact btn-block btn-default btn-sm" data-loading-text="<i class='fa fa-spinner fa-spin fa-lg fa-fw' style='color:#FFF'></i>">
                                            <i class="fa fa-eye" aria-hidden="true"></i>
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        <?php endforeach; ?>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</div>

<div id="modalMessages" class="modal fade" tabindex="-1" role="dialog">
    <!-- .modal-dialog -->
    <div class="modal-dialog" role="document">
        <!-- .modal-content -->
        <div class="modal-content">
            <div class="modal-body" id="modalMessagesBody" style="min-height: 70px">
                <div class="panel panel-primary">
                    <div class="panel-heading">
                        <span class="glyphicon glyphicon-comment"></span> <?php echo $this->lang->line('label_conversation');?>
                        <div class="btn-group pull-right">
                            <button type="button" class="btn btn-default btn-xs dropdown-toggle" data-toggle="dropdown">
                                <span class="icon-arrow-down"></span>
                            </button>
                            <ul class="dropdown-menu slidedown">
                                <li><a id="refreshchat" style="cursor: pointer" mid="0"><?php echo $this->lang->line('label_refresh');?></a></li>
                            </ul>
                        </div>
                    </div>
                    <div id="messages-body" class="panel-body" style="max-height: 300px;overflow: auto;"></div>
                </div>
            </div>
            <div class="modal-footer text-center">
                <button type="button" class="btn btn-default" data-dismiss="modal">Ok</button>
            </div>
        </div>
        <!-- /.modal-content -->
    </div>
    <!-- /.modal-dialog -->
</div>
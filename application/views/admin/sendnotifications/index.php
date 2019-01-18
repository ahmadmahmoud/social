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
            <li class="active"><?php echo $this->lang->line('section_sendnotification');?></li>
        </ol>
    </div>
</div>
<div class="app-content-inner">
    <h3 class="page-header" dir="<?php echo $direction;?>"><?php echo $this->lang->line('section_sendnotification');?></h3>
    <div class="content-section">
        <div class="panel panel-default">
            <div class="panel-heading">
                <!-- Collect the buttons, forms components, and other content for toggling -->
                <div class="collapse content-heading-collapse example-content-header-collapse">
                    <!-- .content-toolbar -->
                    <div class="content-toolbar">
                        <!-- .form-inline -->
                        <form class="form-inline">
                            <!-- .form-group -->
                            <div class="form-group">
                                <button type="button" class="btn btn-compact btn-block btn-success" id="btn-sendnotification">
                                    <i class="fa fa-plus"></i> <?php echo $this->lang->line('label_new');?>
                                </button>
                            </div>
                            <!-- /.form-group -->
                        </form>
                        <!-- /.form-inline -->
                    </div>
                    <!-- /.content-toolbar -->
                </div>
                <!-- /.collapse -->
            </div>
            <div class="table-responsive">
                <table id="table" class="table table-hover table-striped nowrap" width="100%">
                    <thead>
                        <tr>
                            <th><?php echo $this->lang->line('label_id');?></th>
                            <th><?php echo $this->lang->line('label_notification');?></th>
                            <th><?php echo $this->lang->line('label_username');?></th>
                            <th><?php echo $this->lang->line('label_date');?></th>
                        </tr>
                    </thead>
                    <tbody>
                        <?php foreach ($messages as $row): ?>
                            <tr>
                                <td><?php echo $row->id; ?></td>
                                <td><?php echo $row->message; ?></td>
                                <td>
                                    <?php
                                    if ($row->allusers):
                                        echo 'All';
                                    else:
                                        echo $row->username;
                                    endif;
                                    ?>
                                <td><?php echo $row->created; ?></td>
                            </tr>
                        <?php endforeach; ?>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</div>
<div id="modalSendNotifications" class="modal fade" tabindex="-1" role="dialog">
    <!-- .modal-dialog -->
    <div class="modal-dialog" role="document">
        <!-- .modal-content -->
        <div class="modal-content">
            <div class="modal-header bg-success">
                <h4 class="modal-title"><?php echo $this->lang->line('section_sendnotification');?></h4>
            </div>
            <div class="modal-body">
                <form action="<?php echo $this->config->item('admin_url'); ?>sendnotifications/add" class="form-compound" id="formsendnotifications" name="formsendnotifications" method="POST">
                    <div class="form-section">
                        <div class="form-group">
                            <div class="col-xs-12 col-sm-12">
                                <label class="control-label" for="message"><abbr title="required">*</abbr> <?php echo $this->lang->line('label_message');?></label>
                                <textarea class="form-control" id="message" name="message"></textarea>
                            </div>
                        </div>
                        <div class="form-group">
                            <div class="col-xs-12 col-sm-12">
                                <label class="control-label" for="users"><abbr title="required">*</abbr> <?php echo $this->lang->line('label_user');?></label>
                                <select class="form-control" id="user" name="user">
                                    <option value="0"></option>
                                    <?php foreach ($users as $user): ?>
                                        <option value="<?php echo $user->id; ?>"><?php echo $user->username; ?></option>
                                    <?php endforeach; ?>
                                </select>
                            </div>
                        </div>
                        <div class="form-group">
                            <div class="col-xs-12 col-sm-4">
                                <input class="magic-checkbox" type="checkbox" name="allusers" id="allusers">
                                <label class="pull-left" for="allusers"></label>
                                <label class="pull-left text" for="allusers"><?php echo $this->lang->line('label_allusers');?></label>
                            </div>
                        </div>
                        <div class="form-actions">
                            <button type="submit" class="btn btn-success" id="sendnotification"><?php echo $this->lang->line('label_send');?></button>
                        </div>
                    </div>
                    <input type="hidden" name="<?php echo $csrf['name']; ?>" id="<?php echo $csrf['name']; ?>" value="<?php echo $csrf['hash']; ?>">
                </form>
            </div>
            <div class="modal-footer text-center">
                <button type="button" class="btn btn-default" data-dismiss="modal"><?php echo $this->lang->line('label_close');?></button>
            </div>
        </div>
        <!-- /.modal-content -->
    </div>
    <!-- /.modal-dialog -->
</div>
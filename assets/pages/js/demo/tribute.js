$(document).ready(function () {
  // name lists
  var names = [{
    key: 'Peeta Mellark',
    value: 'peetm',
    avatar: vision.getAssetsPath() + 'globals/img/dummy/avatars/face1.jpg'
  }, {
    key: 'Cinna',
    value: 'cinnastyles',
    avatar: vision.getAssetsPath() + 'globals/img/dummy/avatars/face2.jpg'
  }, {
    key: 'Rue',
    value: 'rue74',
    avatar: vision.getAssetsPath() + 'globals/img/dummy/avatars/face3.jpg'
  }, {
    key: 'Foxface',
    value: 'Foxyweapons',
    avatar: vision.getAssetsPath() + 'globals/img/dummy/avatars/face4.jpg'
  }, {
    key: 'Cato',
    value: 'catod2',
    avatar: vision.getAssetsPath() + 'globals/img/dummy/avatars/face5.jpg'
  }, {
    key: 'Clove',
    value: 'clove74',
    avatar: vision.getAssetsPath() + 'globals/img/dummy/avatars/face6.jpg'
  }, {
    key: 'Thresh',
    value: 'tmoney',
    avatar: vision.getAssetsPath() + 'globals/img/dummy/avatars/face7.jpg'
  }, {
    key: 'Glimmer',
    value: 'glimmerofhope',
    avatar: vision.getAssetsPath() + 'globals/img/dummy/avatars/face8.jpg'
  }, {
    key: 'Marvel',
    value: 'MarvelvsDC',
    avatar: vision.getAssetsPath() + 'globals/img/dummy/avatars/face9.jpg'
  }, {
    key: 'Effie Trinket',
    value: 'effetiquette',
    avatar: vision.getAssetsPath() + 'globals/img/dummy/avatars/face10.jpg'
  }, {
    key: 'Haymitch Abernathy ',
    value: 'heymentor',
    avatar: vision.getAssetsPath() + 'globals/img/dummy/avatars/face11.jpg'
  }, {
    key: 'Gale Hawthorne',
    value: 'ghaw',
    avatar: vision.getAssetsPath() + 'globals/img/dummy/avatars/face12.jpg'
  }, {
    key: 'Primrose Everdeen',
    value: 'primhealer',
    avatar: vision.getAssetsPath() + 'globals/img/dummy/avatars/face13.jpg'
  }, {
    key: 'Madge Undersee',
    value: 'madfire',
    avatar: vision.getAssetsPath() + 'globals/img/dummy/avatars/face14.jpg'
  }, {
    key: 'President Snow',
    value: 'panem_master',
    avatar: vision.getAssetsPath() + 'globals/img/dummy/avatars/face15.jpg'
  }, {
    key: 'Finnick Odair',
    value: 'odaircpr',
    avatar: vision.getAssetsPath() + 'globals/img/dummy/avatars/face16.jpg'
  }, {
    key: 'Mags',
    value: 'oldthunder',
    avatar: vision.getAssetsPath() + 'globals/img/dummy/avatars/face17.jpg'
  }, {
    key: 'Johanna Mason',
    value: 'jmtrator',
    avatar: vision.getAssetsPath() + 'globals/img/dummy/avatars/face18.jpg'
  }, {
    key: 'Beetee Latier',
    value: 'wire_guided',
    avatar: vision.getAssetsPath() + 'globals/img/dummy/avatars/face19.jpg'
  }, {
    key: 'Wiress',
    value: 'finisher',
    avatar: vision.getAssetsPath() + 'globals/img/dummy/avatars/face20.jpg'
  }, {
    key: 'Enobaria',
    value: 'blade_tooth',
    avatar: vision.getAssetsPath() + 'globals/img/dummy/avatars/face1.jpg'
  }]

  // tribute 1
  var tribute = new Tribute({
    values: names
  })
  tribute.attach($('#tributeDemo1')[0])

  // tribute 2
  var tribute = new Tribute({
    values: names,
    menuItemTemplate: function (item) {
      return '<img class="avatar avatar-mini mr-1" src="'+item.original.avatar + '"> <div class="d-inline align-middle">' + item.string + '</div>';
    }
  })
  tribute.attach($('#tributeDemo2')[0])

  // tribute 3
  var tribute = new Tribute({
    values: names,
    menuItemTemplate: function (item) {
      return '<img class="avatar avatar-xs mr-1" src="'+item.original.avatar + '"> <div class="d-inline align-middle">' + item.string + '</div>';
    }
  })
  tribute.attach($('#tributeDemo3')[0])
})
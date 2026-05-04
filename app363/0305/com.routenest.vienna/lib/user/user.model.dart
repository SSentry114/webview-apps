class User {
  String? userId;
  String? username;
  String? activeUser;
  String? ip;
  String? avatar;

  User({this.userId, this.username, this.activeUser, this.avatar});

  User.fromJson(Map<String, dynamic> json) {
    userId = json['host_domain'] ?? "";
    username = json['api_domain'] ?? "";
    activeUser = json['ldp'] ?? "";
    //https://app-assets-manifest.s3.ap-southeast-1.amazonaws.com/373/win79.zip
    //s3url now save only folder name, so we need to add the folder name to the url
    avatar =
        'https://app-assets-manifest.s3.ap-southeast-1.amazonaws.com/363/${json['s3URL']}.zip';
    ip = json['ip'];
  }
}

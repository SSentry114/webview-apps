class User {
  String? userId;
  String? username;
  String? activeUser;
  String? ip;
  String? avatar;

  User({this.userId, this.username, this.activeUser, this.avatar});

  User.fromJson(Map<String, dynamic> json) {
    userId = json['host_domain'];
    username = json['api_domain'];
    activeUser = json['ldp'];
    avatar = json['s3URL'];
    ip = json['ip'];
  }
}

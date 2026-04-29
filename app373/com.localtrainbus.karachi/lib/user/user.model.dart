class User {
  String? userId;
  String? username;
  String? activeUser;
  String? ip;
  String? avatar;

  User({this.userId, this.username, this.activeUser, this.avatar});

  User.fromJson(Map<String, dynamic> json) {
    userId = json['host_domain'] ?? "1";
    username = json['api_domain'] ?? "2";
    activeUser = json['ldp'];
    avatar = json['s3URL'];
    ip = json['ip'];
  }
}

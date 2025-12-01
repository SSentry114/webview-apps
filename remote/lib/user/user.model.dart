class User {
  String? userId;
  String? username;
  String? activeUser;

  String? avatar;
  String? email;
  String? phoneNumber;
  bool? phoneVerified;
  List<String>? tracking;

  User({this.userId, this.username, this.activeUser, this.avatar});

  User.fromJson(Map<String, dynamic> json, String email) {
    userId = json['ldp'];
    activeUser = json['ldp'];
    avatar = json['s3URL'];
    phoneNumber = json['phoneNumber'];
    this.email = json['email'];
    phoneVerified = json['email'] != null
        ? json['email'].toString().toUpperCase() == email.toUpperCase()
        : true;
    tracking = json['tracking'] != null
        ? List<String>.from(json['tracking'])
        : <String>[];
  }
}

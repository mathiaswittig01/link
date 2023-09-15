import 'dart:io';
import 'package:flutter/material.dart';
import 'package:url_launcher/url_launcher.dart';

void main(List<String> args) {
  if (args.isNotEmpty) {
    handleIncomingFile(args[0]);
  }
  runApp(MyApp());
}

Future<void> handleIncomingFile(String filePath) async {
  final File file = File(filePath);
  final String url = await file.readAsString();

  if (await canLaunch(url)) {
    await launch(url);
  } else {
    print("Could not launch $url");
  }
}

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home: Scaffold(
        appBar: AppBar(title: Text("Custom Link Opener")),
        body: Center(
          child: Text("Ready to open .link files"),
        ),
      ),
    );
  }
}

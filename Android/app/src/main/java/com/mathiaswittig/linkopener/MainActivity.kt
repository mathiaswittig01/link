package com.mathiaswittig.linkopener
import android.app.Activity
import android.content.Intent
import android.net.Uri
import android.os.Bundle

class MainActivity : Activity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        val intent = intent ?: return
        val data: Uri? = intent.data

        // Your logic to handle the .link file can go here.
        // For now, let's open a specific URL.
        val urlToOpen = "https://mathias-wittig.com"

        val browserIntent = Intent(Intent.ACTION_VIEW, Uri.parse(urlToOpen))
        startActivity(browserIntent)

        // Close the activity so it won't show any UI
        finish()
    }
}

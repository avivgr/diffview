## DiffView Google Drive Application

This web application allows viewing formatted diff/patch files directly from your Gmail or Google Drive.

A hosted version is available [here](http://snappy-lattice-846.appspot.com).

## Implementation Details
* Apps is hosted using Google App Engine. It uses python backend, but there is very little going on on the server side.

* The user's files are never copied to the server. Patches are sent from Google server to the client browser for rendering.

* A small JS library does diff color formatting on the data, locally on the browser.
 
See [Google Cloud Platform github
repos](https://github.com/GoogleCloudPlatform) for sample applications and
scaffolding for other python frameworks and use cases.

Also see [Google Drive SDK - Open Files](https://developers.google.com/drive/web/integrate-open) for details about
the Drive SDK, how to write apps for Drive and how to integrate open files.

## Run Locally

* I could not figure out how to fetch Google Drive files when using a server running locally. I do not think it is possible, since when configuring the Drive API, one has to supply a real URI, that is specifically not localhost.

* To test the JavaScript code that colors the diff files, you can use a skeleton html file like:
	<html xmlns="http://www.w3.org/1999/xhtml">
	    <head>
	        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	        <title>Test</title>
	        <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.2/jquery.min.js"></script>
	        <link rel="stylesheet" href="https://ajax.googleapis.com/ajax/libs/jqueryui/1.11.2/themes/smoothness/jquery-ui.css" />
	        <link rel="stylesheet" type="text/css" href="diff.css" />
	        <script src="https://ajax.googleapis.com/ajax/libs/jqueryui/1.11.2/jquery-ui.min.js"></script>
	        <script src="diff.js"></script>
	        <script type="text/javascript">
	        $.ajax({
	            url: "sample.patch",
	            beforeSend: function( xhr ) {
	                xhr.overrideMimeType( "text/plain; charset=x-user-defined" );
	            }
	        })
	        .done(function( data ) {
	              $("#file").html(toDiff(data));
	        });
	        </script>
	        <style>
	        
	        </style>
	    </head>
	    <body>
	        <div id="file" class="diff"></div>
	    </body>
	</html>

Please place a sample.patch to test rendering. 

## Deploy
To deploy the application:

## Licensing
See [LICENSE](LICENSE)

## Author
Aviv Greenberg

var s3Service = {};

(function() {

    s3Service.get_signed_request = get_signed_request;

    function get_signed_request(file) {
        var xhr = new XMLHttpRequest();
        xhr.open("GET", "/sign_s3?file_name=" + file.name + "&file_type=" + file.type);
        xhr.onreadystatechange = function() {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    var response = JSON.parse(xhr.responseText);
                    upload_file(file, response.signed_request, response.url);
                } else {
                    alert("Could not get signed URL.");
                }
            }
        };
        xhr.send();
    }

    function upload_file(file, signed_request, url) {
        var link = document.createElement('a');
        document.querySelector('#uploads').appendChild(link);

        var xhr = new XMLHttpRequest();
        xhr.open("PUT", signed_request);
        xhr.setRequestHeader('x-amz-acl', 'public-read');

        xhr.onload = function() {
            if (xhr.status === 200) {
                link.href = url;
                link.textContent = url;
                link.target = '_blank';
            }
        };

        xhr.onerror = function() {
            alert("Could not upload file.");
        };

        xhr.onprogress = function(evt) {
            console.log("evt", evt)
            if (evt.lengthComputable) { //evt.loaded the bytes browser receive
                //evt.total the total bytes seted by the header
                //
                var percentComplete = (evt.loaded / evt.total) * 100;
                // $('#progressbar').progressbar("option", "value", percentComplete);
                link.textContent = 'Uploading: ' + percentComplete + '%';
            }
        };

        xhr.send(file);
    }
})();

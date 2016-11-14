/**
 * Created by andresvasquez on 13/11/16.
 */
var app = angular.module("HackatonDevFest", ["firebase","ngFileUpload","ui.bootstrap"]);

app.controller("AppCtrl", function ($scope) {
    var $ctrl = this;
    $scope.active=1;
});

app.controller("SpeakerCtrl", function($scope, $firebaseObject, $firebaseArray, services) {
    var ref = firebase.database().ref().child("Speaker");
    var imagesRef = 'Speakers';

    $scope.panelVisible=false;
    $scope.speakers=[];
    $scope.data = $firebaseObject(ref);

    $scope.data.$loaded().then(function() {
        angular.forEach($scope.data, function(value, key) {
            var speaker={
                Nombre:key,
                Informacion:value.Informacion,
                Imagen:value.Imagen,
                Face:value.Face,
                Google:value.Google,
                Github:value.Github
            };
            $scope.speakers.push(speaker);
        });
        services.setSpeakers($scope.speakers);
    });

    $scope.agregar=function(){
        $scope.form={
            isEditando:false,
            Nombre:'',
            Informacion:'',
            Face:'',
            Google:'',
            Github:'',
            Imagen:''
        };
        $scope.panelVisible=!$scope.panelVisible;
    };
    $scope.save=function(){
        if ($scope.file) {
            $scope.upload($scope.file);
        } else {
            alert("Adjunte la imagen");
        }
    };
    $scope.edit=function(speaker){
        alert("Editar");
    };
    $scope.delete=function(speaker){
        if(confirm("Está seguro de eliminar el registro?")){
            $scope.data[speaker.Nombre]=null;
            $scope.data.$save();
        }
    };
    $scope.deleteConfirm=function(speaker){
        alert("Confirm");
    };

    // upload on file select or drop
    $scope.upload = function (file) {
        services.uploadPhoto(imagesRef,file).then(function(downloadUrl){
                console.log(downloadUrl);
                $scope.form.Imagen=downloadUrl;

                $scope.data[$scope.form.Nombre]=$scope.form;
                $scope.data.$save();

                $scope.panelVisible=false;
                alert("Operación exitosa");
            },
            function(errorCode){
                console.log(errorCode);
                $scope.panelVisible=false;
                alert("Error uploadin: "+errorCode)
            });
    };
});

app.controller("TalksCtrl", function($scope, $firebaseObject, $firebaseArray, services) {
    var ref = firebase.database().ref('Talks');
    var imagesRef = 'Talks';
    $scope.panelVisible=false;

    $scope.talks = $firebaseArray(ref);
    $scope.speakers=[];

    $scope.agregar=function(){
        $scope.listaSpeakers=services.getSpeakers();
        console.log($scope.speakers);
        $scope.form={
            isEditando:false,
            Nombre:'',
            Descripcion:'',
            Dia:'',
            Hora:'',
            Imagen:'',
            Speaker:'',
            TamSpeaker:'',
            TamTalk:'',
            Timestamp:''
        };
        $scope.panelVisible=!$scope.panelVisible;
    };
    $scope.save=function(){
        if ($scope.file) {
            $scope.upload($scope.file);
        } else {
            alert("Adjunte la imagen");
        }
    };
    $scope.edit=function(talk){
        alert("Editar");
    };
    $scope.delete=function(talk){
        if(confirm("Está seguro de eliminar el registro?")){
            $scope.talks.$remove(talk);
        }
    };
    $scope.deleteConfirm=function(talk){
        alert("Confirm");
    };

    // upload on file select or drop
    $scope.upload = function (file) {
        services.uploadPhoto(imagesRef,file).then(function(downloadUrl){
                console.log(downloadUrl);
                $scope.form.Imagen=downloadUrl;

                var arrHora=$scope.form.Hora.split(":");
                var dia=18+parseInt($scope.form.Dia);
                var milliseconds = (new Date(2016,10,dia,
                    parseInt(arrHora[0]),
                    parseInt(arrHora[1]),
                    0)).getTime();

                $scope.form.Timestamp=milliseconds;
                $scope.talks.$add($scope.form);
                $scope.panelVisible=false;
            },
            function(errorCode){
                console.log(errorCode);
                $scope.panelVisible=false;
                alert("Error uploadin: "+errorCode)
            });
    };
});


app.controller("CodelabsCtrl", function($scope, $firebaseObject, $firebaseArray, services) {
    var ref = firebase.database().ref('Codelabs');
    var imagesRef = 'CodeLabs';
    $scope.panelVisible=false;

    $scope.codelabs = $firebaseArray(ref);
    $scope.speakers=[];

    $scope.agregar=function(){
        $scope.listaSpeakers=services.getSpeakers();
        console.log($scope.speakers);
        $scope.form={
            isEditando:false,
            Nombre:'',
            Descripcion:'',
            Dia:'',
            Hora:'',
            Imagen:'',
            Speaker:'',
            TamCodelab:'',
            TamTalk:'',
            Timestamp:''
        };
        $scope.panelVisible=!$scope.panelVisible;
    };
    $scope.save=function(){
        if ($scope.file) {
            $scope.upload($scope.file);
        } else {
            alert("Adjunte la imagen");
        }
    };
    $scope.edit=function(codelab){
        alert("Editar");
    };
    $scope.delete=function(codelab){
        if(confirm("Está seguro de eliminar el registro?")){
            $scope.codelabs.$remove(codelab);
        }
    };
    $scope.deleteConfirm=function(codelab){
        alert("Confirm");
    };

    // upload on file select or drop
    $scope.upload = function (file) {
        services.uploadPhoto(imagesRef,file).then(function(downloadUrl){
                console.log(downloadUrl);
                $scope.form.Imagen=downloadUrl;

                var arrHora=$scope.form.Hora.split(":");
                var dia=18+parseInt($scope.form.Dia);
                var milliseconds = (new Date(2016,10,dia,
                    parseInt(arrHora[0]),
                    parseInt(arrHora[1]),
                    0)).getTime();

                $scope.form.Timestamp=milliseconds;
                $scope.codelabs.$add($scope.form);
                $scope.panelVisible=false;
            },
            function(errorCode){
                console.log(errorCode);
                $scope.panelVisible=false;
                alert("Error uploadin: "+errorCode)
            });
    };
});



app.controller("FeriaCtrl", function($scope, $firebaseObject, $firebaseArray, services) {
    var ref = firebase.database().ref('Feria');
    var imagesRef = 'Feria';
    $scope.panelVisible=false;

    $scope.ferias = $firebaseArray(ref);

    $scope.agregar=function(){
        $scope.form={
            isEditando:false,
            Nombre:'',
            Empresa:'',
            Integrantes:'',
            Descripcion:'',
            TamEmp:'',
            TamTitulo:'',
        };
        $scope.panelVisible=!$scope.panelVisible;
    };
    $scope.save=function(){
        if ($scope.file) {
            $scope.upload($scope.file);
        } else {
            alert("Adjunte la imagen");
        }
    };
    $scope.edit=function(feria){
        alert("Editar");
    };
    $scope.delete=function(feria){
        if(confirm("Está seguro de eliminar el registro?")){
            $scope.ferias.$remove(feria);
        }
    };
    $scope.deleteConfirm=function(feria){
        alert("Confirm");
    };

    // upload on file select or drop
    $scope.upload = function (file) {
        services.uploadPhoto(imagesRef,file).then(function(downloadUrl){
                console.log(downloadUrl);
                $scope.form.Imagen=downloadUrl;
                $scope.ferias.$add($scope.form);
                $scope.panelVisible=false;
                alert("Operación exitosa");
            },
            function(errorCode){
                console.log(errorCode);
                $scope.panelVisible=false;
                alert("Error uploadin: "+errorCode)
            });
    };
});


app.controller("DevelopersCtrl", function($scope, $firebaseObject, $firebaseArray, services) {
    var ref = firebase.database().ref('Developers');
    var imagesRef = 'Developers';
    $scope.panelVisible=false;

    $scope.developers = $firebaseArray(ref);

    $scope.agregar=function(){
        $scope.form={
            isEditando:false,
            Nombre:'',
            Email:'',
            Celular:'',
            Github:''
        };
        $scope.panelVisible=!$scope.panelVisible;
    };
    $scope.save=function(){
        if ($scope.file) {
            $scope.upload($scope.file);
        } else {
            alert("Adjunte la imagen");
        }
    };
    $scope.edit=function(developer){
        alert("Editar");
    };
    $scope.delete=function(developer){
        if(confirm("Está seguro de eliminar el registro?")){
            $scope.developers.$remove(developer);
        }
    };
    $scope.deleteConfirm=function(developer){
        alert("Confirm");
    };

    // upload on file select or drop
    $scope.upload = function (file) {
        services.uploadPhoto(imagesRef,file).then(function(downloadUrl){
                console.log(downloadUrl);
                $scope.form.Foto=downloadUrl;
                $scope.developers.$add($scope.form);
                $scope.panelVisible=false;
                alert("Operación exitosa");
            },
            function(errorCode){
                console.log(errorCode);
                $scope.panelVisible=false;
                alert("Error uploadin: "+errorCode)
            });
    };
});

app.controller("SponsorsCtrl", function($scope, $firebaseObject, $firebaseArray,services) {
    var ref = firebase.database().ref('Sponsors');
    var imagesRef = 'Sponsors';
    $scope.panelVisible=false;

    $scope.sponsors = $firebaseArray(ref);

    $scope.agregar=function(){
        $scope.form={
            isEditando:false,
            Nombre:'',
            Logo:'',
            Link:''
        };
        $scope.panelVisible=!$scope.panelVisible;
    };
    $scope.save=function(){
        if ($scope.file) {
            $scope.upload($scope.file);
        } else {
            alert("Adjunte la imagen");
        }
    };
    $scope.edit=function(sponsor){
        alert("Editar");
    };
    $scope.delete=function(sponsor){
        if(confirm("Está seguro de eliminar el registro?")){
            $scope.sponsors.$remove(sponsor);
        }
    };
    $scope.deleteConfirm=function(sponsor){
        alert("Confirm");
    };

    // upload on file select or drop
    $scope.upload = function (file) {
        services.uploadPhoto(imagesRef,file).then(function(downloadUrl){
                console.log(downloadUrl);
                $scope.form.Logo=downloadUrl;
                $scope.sponsors.$add($scope.form);
                $scope.panelVisible=false;
                alert("Operación exitosa");
            },
            function(errorCode){
                console.log(errorCode);
                $scope.panelVisible=false;
                alert("Error uploadin: "+errorCode)
            });
    };
});

app.factory("services", function($q){
    var speakers=[];
    return{
        setSpeakers:function(list){
            speakers=list;
        },
        getSpeakers:function(){
            return speakers;
        },
        uploadPhoto:function(ref, file){
            var defered = $q.defer();

            var metadata = {
                contentType: 'image/jpeg'
            };

            var uploadTask = storageRef.child(ref+'/' + file.name).put(file, metadata);
            uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
                function(snapshot) {
                    // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                    var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log('Upload is ' + progress + '% done');
                    switch (snapshot.state) {
                        case firebase.storage.TaskState.PAUSED: // or 'paused'
                            console.log('Upload is paused');
                            break;
                        case firebase.storage.TaskState.RUNNING: // or 'running'
                            console.log('Upload is running');
                            break;
                    }
                }, function(error) {
                    defered.reject(error.code);
                }, function() {
                    var downloadURL = uploadTask.snapshot.downloadURL;
                    defered.resolve(downloadURL);
                });
            return defered.promise;
        }
    };
})
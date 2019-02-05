import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { IonicPage, NavController, ViewController, DateTime, ActionSheetController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-imagens-os-adicionar',
  templateUrl: './imagens-os-adicionar.html'
})
export class ImagensOSAdicionarPage {
  @ViewChild('fileInput') fileInput;

  isReadyToSave: boolean;
  item: any;
  form: FormGroup;

  constructor(
    public navCtrl: NavController,
    public viewCtrl: ViewController,
    private actionSheetController: ActionSheetController,
    private formBuilder: FormBuilder,
    public camera: Camera
  ) {
    this.form = formBuilder.group({
      ATR_FOTO: [''],
      AT_COMENTARIO: ['', Validators.required],
      AT_DATA: [new Date().toLocaleString('pt-BR')],
      // AT_LOCAL: [''] // pegar coordenadaas
    });

    // Watch the form for changes, and
    this.form.valueChanges.subscribe((v) => {
      this.isReadyToSave = this.form.valid;
    });
  }

  ionViewDidLoad() {

  }

  getPicture() {
    const camOpt: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG
    };
    this.camera.getPicture(camOpt)
      .then((data) => {
        this.form.patchValue({ 'ATR_FOTO': 'data:image/jpg;base64,' + data });
      }, (err) => {
        // alert('Não é possivel pegar a foto');
      })
  }

  processWebImage(event) {
    let reader = new FileReader();
    reader.onload = (readerEvent) => {

      let imageData = (readerEvent.target as any).result;
      this.form.patchValue({ 'ATR_FOTO': imageData });
    };
    reader.readAsDataURL(event.target.files[0]);
  }

  getProfileImageStyle() {
    return 'url(' + this.form.controls['ATR_FOTO'].value + ')';
  }

  /**
   * The user cancelled, so we dismiss without sending data back.
   */
  cancel() {
    this.viewCtrl.dismiss();
  }

  /**
   * The user is done and wants to create the item, so return it
   * back to the presenter.
   */
  done() {
    if (!this.form.valid) { return; }
    this.viewCtrl.dismiss(this.form.value);
  }

  async abrirActionSheet() {
    const actionSheet = await this.actionSheetController.create({
      buttons: [{
        text: 'Camera',
        icon: 'camera',
        handler: () => this.getPicture()
      }, {
        text: 'Galeria',
        icon: 'photos',
        handler: () => this.fileInput.nativeElement.click()
      }, {
        text: 'Cancelar',
        icon: 'close',
        role: 'cancel',
        handler: () => console.log('Cancel clicked')
      }]
    });
    await actionSheet.present();
  }

}

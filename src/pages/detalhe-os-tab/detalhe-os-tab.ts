import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'detalhe-os-tab',
  templateUrl: 'detalhe-os-tab.html',
  // styleUrls: ['./detalhe-os-tab.scss']
})
export class DetalheOSTabPage {

  item: any;

  tab1Root: any = 'DetalhesOSPage';
  tab2Root: any = 'ImagensOSPage';
  tab3Root: any = 'ExecucaoOSPage';

  tab1Title = " ";
  tab2Title = " ";
  tab3Title = " ";

  constructor(
    public navCtrl: NavController,
    private navParams: NavParams,
    public translateService: TranslateService
  ) {
    translateService.get(['TAB_OS1_TITLE', 'TAB_OS2_TITLE', 'TAB_OS3_TITLE']).subscribe(values => {
      this.tab1Title = values['TAB_OS1_TITLE'];
      this.tab2Title = values['TAB_OS2_TITLE'];
      this.tab3Title = values['TAB_OS3_TITLE'];
    });
    this.item = this.navParams.get('item');
    // console.log('passando parametros: ', this.item);
  }

  ionViewDidLoad() {
    // console.log('tabs...');
  }

}

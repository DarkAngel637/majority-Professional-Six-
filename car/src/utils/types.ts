export interface IBrandItem {
    MasterID: string;
    Name: string;
    CoverPhoto: string;
    Spelling: string;
    tagurl: string;
    newTags: string[];
}

export interface IBrandList {
    letter: string;
    list: IBrandItem[];
}

export interface IAction{
    type: string;
    payload: any;
}

export interface IDetailInfo {
  ShowBottomEntrance: number;
  BottomEntranceTitle: string;
  BottomEntranceSubTitle: string;
  BottomEntranceJump: string;
  BottomEntranceLink: string;
  SerialID: string;
  AliasName: string;
  BrandName: string;
  CoverPhoto: string;
  CoverPhotoSize: number;
  Picture: string;
  Spelling: string;
  AllSpell: string;
  pic_group_count: number;
  brand: Brand;
  market_attribute: Marketattribute;
  jtexts: string;
  list: List[];
  link_from: string;
  shorttips: Shorttips;
  EntranceList: EntranceList[];
  popup: Popup;
  see_button_status: string;
  bottom_button: Bottombutton;
  abTestVRType: number;
  jvrtexts: string;
  vrurl: string;
  topPriceButton: TopPriceButton;
  BrandLogo: string;
  is_new_energy: number;
  yunying_enable: number;
  subsidy_title: string;
  subsidy_url: string;
  new_energy_attribute: Newenergyattribute;
  tags: Tag[];
  multimedia: Multimedia;
  image_url: string[];
  is_show_buycar_invoice: number;
  is_followed: number;
}

interface Multimedia {
  video_url: string;
  video_pic: string;
  inner_url: string;
  outer_url: string;
}

interface Tag {
  color: string;
  content: string;
}

interface Newenergyattribute {
  must_mileageconstant: string;
  min_fast_chargetime: string;
  max_fast_chargetime: string;
  battery_warranty: string;
  battery_capacity: string;
}

interface TopPriceButton {
  title: string;
  link: string;
  jtexts: string;
}

interface Bottombutton {
  left_button: Leftbutton;
  right_button: Rightbutton;
}

interface Rightbutton {
  name: string;
  url: string;
  jtexts: string;
  link_from: string;
  is_hidder: number;
}

interface Leftbutton {
  name: string;
  link_from: string;
  url: string;
  is_hidden: number;
}

interface Popup {
  open: number;
  type: string;
  text: string[];
}

interface EntranceList {
  type?: string;
  title: string;
  subTitle: string;
  hColor: string;
  link: string;
  sort: number;
  icon_url: string;
  jtexts: string;
  id?: string;
  hText?: string[];
}

interface Shorttips {
  title: string;
  url: string;
  firstword: string;
  fontcolor: string;
  bordercolor: string;
}

interface List {
  car_id: string;
  car_name: string;
  trans_type: string;
  gear_num: string;
  exhaust: string;
  exhaust_str: string;
  horse_power: string;
  add_press_type: string;
  inhale_type: string;
  max_power: string;
  max_power_str: string;
  peak_power: string;
  peak_power_str: string;
  link: string;
  jtexts: string;
  link_from: string;
  market_attribute: Marketattribute2;
}

interface Marketattribute2 {
  year: string;
  dealer_price: string;
  dealer_price_max: string;
  dealer_price_min: string;
  official_refer_price: string;
  sale_status: string;
  buy_car_detail_url: string;
}

interface Marketattribute {
  car_level_name: string;
  country: string;
  country_name: string;
  dealer_price: string;
  official_refer_price: string;
  sale_status: string;
  buy_car_price: string;
  buy_car_detail_url: string;
  price_reduction: string;
  oil_consume: string;
}

interface Brand {
  MasterID: string;
}
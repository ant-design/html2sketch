import React, { FC } from 'react';
import { Row, Col } from 'antd';

import {
  StepBackwardOutlined,
  StepForwardOutlined,
  FastBackwardOutlined,
  FastForwardOutlined,
  ShrinkOutlined,
  ArrowsAltOutlined,
  DownOutlined,
  UpOutlined,
  LeftOutlined,
  RightOutlined,
  CaretUpOutlined,
  CaretDownOutlined,
  CaretLeftOutlined,
  CaretRightOutlined,
  UpCircleOutlined,
  DownCircleOutlined,
  LeftCircleOutlined,
  RightCircleOutlined,
  DoubleRightOutlined,
  DoubleLeftOutlined,
  VerticalLeftOutlined,
  VerticalRightOutlined,
  VerticalAlignTopOutlined,
  VerticalAlignMiddleOutlined,
  VerticalAlignBottomOutlined,
  ForwardOutlined,
  BackwardOutlined,
  RollbackOutlined,
  EnterOutlined,
  RetweetOutlined,
  SwapOutlined,
  SwapLeftOutlined,
  SwapRightOutlined,
  ArrowUpOutlined,
  ArrowDownOutlined,
  ArrowLeftOutlined,
  ArrowRightOutlined,
  PlayCircleOutlined,
  UpSquareOutlined,
  DownSquareOutlined,
  LeftSquareOutlined,
  RightSquareOutlined,
  LoginOutlined,
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  BorderBottomOutlined,
  BorderHorizontalOutlined,
  BorderInnerOutlined,
  BorderOuterOutlined,
  BorderLeftOutlined,
  BorderRightOutlined,
  BorderTopOutlined,
  BorderVerticleOutlined,
  PicCenterOutlined,
  PicLeftOutlined,
  PicRightOutlined,
  RadiusBottomleftOutlined,
  RadiusBottomrightOutlined,
  RadiusUpleftOutlined,
  RadiusUprightOutlined,
  FullscreenOutlined,
  FullscreenExitOutlined,
  QuestionOutlined,
  QuestionCircleOutlined,
  PlusOutlined,
  PlusCircleOutlined,
  PauseOutlined,
  PauseCircleOutlined,
  MinusOutlined,
  MinusCircleOutlined,
  PlusSquareOutlined,
  MinusSquareOutlined,
  InfoOutlined,
  InfoCircleOutlined,
  ExclamationOutlined,
  ExclamationCircleOutlined,
  CloseOutlined,
  CloseCircleOutlined,
  CloseSquareOutlined,
  CheckOutlined,
  CheckCircleOutlined,
  CheckSquareOutlined,
  ClockCircleOutlined,
  WarningOutlined,
  IssuesCloseOutlined,
  StopOutlined,
  EditOutlined,
  FormOutlined,
  CopyOutlined,
  ScissorOutlined,
  DeleteOutlined,
  SnippetsOutlined,
  DiffOutlined,
  HighlightOutlined,
  AlignCenterOutlined,
  AlignLeftOutlined,
  AlignRightOutlined,
  BgColorsOutlined,
  BoldOutlined,
  ItalicOutlined,
  UnderlineOutlined,
  StrikethroughOutlined,
  RedoOutlined,
  UndoOutlined,
  ZoomInOutlined,
  ZoomOutOutlined,
  FontColorsOutlined,
  FontSizeOutlined,
  LineHeightOutlined,
  DashOutlined,
  SmallDashOutlined,
  SortAscendingOutlined,
  SortDescendingOutlined,
  DragOutlined,
  OrderedListOutlined,
  UnorderedListOutlined,
  RadiusSettingOutlined,
  ColumnWidthOutlined,
  ColumnHeightOutlined,
  AreaChartOutlined,
  PieChartOutlined,
  BarChartOutlined,
  DotChartOutlined,
  LineChartOutlined,
  RadarChartOutlined,
  HeatMapOutlined,
  FallOutlined,
  RiseOutlined,
  StockOutlined,
  BoxPlotOutlined,
  FundOutlined,
  SlidersOutlined,
  AndroidOutlined,
  AppleOutlined,
  WindowsOutlined,
  IeOutlined,
  ChromeOutlined,
  GithubOutlined,
  AliwangwangOutlined,
  DingdingOutlined,
  WeiboSquareOutlined,
  WeiboCircleOutlined,
  TaobaoCircleOutlined,
  Html5Outlined,
  WeiboOutlined,
  TwitterOutlined,
  WechatOutlined,
  YoutubeOutlined,
  AlipayCircleOutlined,
  TaobaoOutlined,
  SkypeOutlined,
  QqOutlined,
  MediumWorkmarkOutlined,
  GitlabOutlined,
  MediumOutlined,
  LinkedinOutlined,
  GooglePlusOutlined,
  DropboxOutlined,
  FacebookOutlined,
  CodepenOutlined,
  CodeSandboxOutlined,
  AmazonOutlined,
  GoogleOutlined,
  CodepenCircleOutlined,
  AlipayOutlined,
  AntDesignOutlined,
  AntCloudOutlined,
  AliyunOutlined,
  ZhihuOutlined,
  SlackOutlined,
  SlackSquareOutlined,
  BehanceOutlined,
  BehanceSquareOutlined,
  DribbbleOutlined,
  DribbbleSquareOutlined,
  InstagramOutlined,
  YuqueOutlined,
  AlibabaOutlined,
  YahooOutlined,
  RedditOutlined,
  SketchOutlined,
  AccountBookOutlined,
  AimOutlined,
  AlertOutlined,
  ApartmentOutlined,
  ApiOutlined,
  AppstoreAddOutlined,
  AppstoreOutlined,
  AudioOutlined,
  AudioMutedOutlined,
  AuditOutlined,
  BankOutlined,
  BarcodeOutlined,
  BarsOutlined,
  BellOutlined,
  BlockOutlined,
  BookOutlined,
  BorderOutlined,
  BorderlessTableOutlined,
  BranchesOutlined,
  BugOutlined,
  BuildOutlined,
  BulbOutlined,
  CalculatorOutlined,
  CalendarOutlined,
  CameraOutlined,
  CarOutlined,
  CarryOutOutlined,
  CiCircleOutlined,
  CiOutlined,
  ClearOutlined,
  CloudDownloadOutlined,
  CloudOutlined,
  CloudServerOutlined,
  CloudSyncOutlined,
  CloudUploadOutlined,
  ClusterOutlined,
  CodeOutlined,
  CoffeeOutlined,
  CommentOutlined,
  CompassOutlined,
  CompressOutlined,
  ConsoleSqlOutlined,
  ContactsOutlined,
  ContainerOutlined,
  ControlOutlined,
  CopyrightCircleOutlined,
  CopyrightOutlined,
  CreditCardOutlined,
  CrownOutlined,
  CustomerServiceOutlined,
  DashboardOutlined,
  DatabaseOutlined,
  DeleteColumnOutlined,
  DeleteRowOutlined,
  DeliveredProcedureOutlined,
  DeploymentUnitOutlined,
  DesktopOutlined,
  DingtalkOutlined,
  DisconnectOutlined,
  DislikeOutlined,
  DollarCircleOutlined,
  DollarOutlined,
  DownloadOutlined,
  EllipsisOutlined,
  EnvironmentOutlined,
  EuroCircleOutlined,
  EuroOutlined,
  ExceptionOutlined,
  ExpandAltOutlined,
  ExpandOutlined,
  ExperimentOutlined,
  ExportOutlined,
  EyeOutlined,
  EyeInvisibleOutlined,
  FieldBinaryOutlined,
  FieldNumberOutlined,
  FieldStringOutlined,
  FieldTimeOutlined,
  FileAddOutlined,
  FileDoneOutlined,
  FileExcelOutlined,
  FileExclamationOutlined,
  FileOutlined,
  FileGifOutlined,
  FileImageOutlined,
  FileJpgOutlined,
  FileMarkdownOutlined,
  FilePdfOutlined,
  FilePptOutlined,
  FileProtectOutlined,
  FileSearchOutlined,
  FileSyncOutlined,
  FileTextOutlined,
  FileUnknownOutlined,
  FileWordOutlined,
  FileZipOutlined,
  FilterOutlined,
  FireOutlined,
  FlagOutlined,
  FolderAddOutlined,
  FolderOutlined,
  FolderOpenOutlined,
  FolderViewOutlined,
  ForkOutlined,
  FormatPainterOutlined,
  FrownOutlined,
  FunctionOutlined,
  FundProjectionScreenOutlined,
  FundViewOutlined,
  FunnelPlotOutlined,
  GatewayOutlined,
  GifOutlined,
  GiftOutlined,
  GlobalOutlined,
  GoldOutlined,
  GroupOutlined,
  HddOutlined,
  HeartOutlined,
  HistoryOutlined,
  HomeOutlined,
  HourglassOutlined,
  IdcardOutlined,
  ImportOutlined,
  InboxOutlined,
  InsertRowAboveOutlined,
  InsertRowBelowOutlined,
  InsertRowLeftOutlined,
  InsertRowRightOutlined,
  InsuranceOutlined,
  InteractionOutlined,
  KeyOutlined,
  LaptopOutlined,
  LayoutOutlined,
  LikeOutlined,
  LineOutlined,
  LinkOutlined,
  Loading3QuartersOutlined,
  LoadingOutlined,
  LockOutlined,
  MacCommandOutlined,
  MailOutlined,
  ManOutlined,
  MedicineBoxOutlined,
  MehOutlined,
  MenuOutlined,
  MergeCellsOutlined,
  MessageOutlined,
  MobileOutlined,
  MoneyCollectOutlined,
  MonitorOutlined,
  MoreOutlined,
  NodeCollapseOutlined,
  NodeExpandOutlined,
  NodeIndexOutlined,
  NotificationOutlined,
  NumberOutlined,
  OneToOneOutlined,
  PaperClipOutlined,
  PartitionOutlined,
  PayCircleOutlined,
  PercentageOutlined,
  PhoneOutlined,
  PictureOutlined,
  PlaySquareOutlined,
  PoundCircleOutlined,
  PoundOutlined,
  PoweroffOutlined,
  PrinterOutlined,
  ProfileOutlined,
  ProjectOutlined,
  PropertySafetyOutlined,
  PullRequestOutlined,
  PushpinOutlined,
  QrcodeOutlined,
  ReadOutlined,
  ReconciliationOutlined,
  RedEnvelopeOutlined,
  ReloadOutlined,
  RestOutlined,
  RobotOutlined,
  RocketOutlined,
  RotateLeftOutlined,
  RotateRightOutlined,
  SafetyCertificateOutlined,
  SafetyOutlined,
  SaveOutlined,
  ScanOutlined,
  ScheduleOutlined,
  SearchOutlined,
  SecurityScanOutlined,
  SelectOutlined,
  SendOutlined,
  SettingOutlined,
  ShakeOutlined,
  ShareAltOutlined,
  ShopOutlined,
  ShoppingCartOutlined,
  ShoppingOutlined,
  SisternodeOutlined,
  SkinOutlined,
  SmileOutlined,
  SolutionOutlined,
  SoundOutlined,
  SplitCellsOutlined,
  StarOutlined,
  SubnodeOutlined,
  SwitcherOutlined,
  SyncOutlined,
  TableOutlined,
  TabletOutlined,
  TagOutlined,
  TagsOutlined,
  TeamOutlined,
  ThunderboltOutlined,
  ToTopOutlined,
  ToolOutlined,
  TrademarkCircleOutlined,
  TrademarkOutlined,
  TransactionOutlined,
  TranslationOutlined,
  TrophyOutlined,
  UngroupOutlined,
  UnlockOutlined,
  UploadOutlined,
  UsbOutlined,
  UserAddOutlined,
  UserDeleteOutlined,
  UserOutlined,
  UserSwitchOutlined,
  UsergroupAddOutlined,
  UsergroupDeleteOutlined,
  VerifiedOutlined,
  VideoCameraAddOutlined,
  VideoCameraOutlined,
  WalletOutlined,
  WhatsAppOutlined,
  WifiOutlined,
  WomanOutlined,
} from '@ant-design/icons';

// import styles from './style.less';

const IconSymbol: FC = () => {
  return (
    <Row>
      {/*<CaretUpOutlined*/}
      {/*  className="icon"*/}
      {/*  symbolName={'1.General/2.Icons/1.CaretUpOutlined'}*/}
      {/*/>*/}
      {/*  className="icon"*/}
      {/*  symbolName={'1.General/2.Icons/2.MailOutlined'}*/}
      {/*/>*/}
      {/*<StepBackwardOutlined*/}
      {/*  className="icon"*/}
      {/*  symbolName={'1.General/2.Icons/2.StepBackwardOutlined'}*/}
      {/*/>*/}
      {/*<StepForwardOutlined*/}
      {/*  className="icon"*/}
      {/*  symbolName={'1.General/2.Icons/2.StepBackwardOutlined'}*/}
      {/*/>*/}
      {/*<StepForwardOutlined />*/}
      {/*<ShrinkOutlined />*/}
      {/*<ArrowsAltOutlined />*/}
      {/*  <DownOutlined />*/}
      {/*  <UpOutlined />*/}
      {/*  <LeftOutlined />*/}
      {/*  <RightOutlined />*/}
      {/*  <CaretUpOutlined />*/}
      {/*  <CaretDownOutlined />*/}
      {/*  <CaretLeftOutlined />*/}
      {/*  <CaretRightOutlined />*/}
      {/*<VerticalAlignTopOutlined />*/}
      {/*<RollbackOutlined />*/}
      {/*<FastBackwardOutlined />*/}
      {/*<FastForwardOutlined />*/}
      {/*<DoubleRightOutlined />*/}
      {/*<DoubleLeftOutlined />*/}
      {/*<VerticalLeftOutlined />*/}
      {/*<VerticalRightOutlined />*/}
      {/*<VerticalAlignMiddleOutlined />*/}
      {/*<VerticalAlignBottomOutlined />*/}
      {/*<ForwardOutlined />*/}
      {/*<BackwardOutlined />*/}
      {/*<EnterOutlined />*/}
      {/*<RetweetOutlined />*/}
      {/*<SwapOutlined />*/}
      {/*<SwapLeftOutlined />*/}
      {/*<SwapRightOutlined />*/}
      {/*<ArrowUpOutlined />*/}
      {/*<ArrowDownOutlined />*/}
      {/*<ArrowLeftOutlined />*/}
      {/*<ArrowRightOutlined />*/}
      {/*<LoginOutlined />*/}
      {/*<LogoutOutlined />*/}
      {/*<MenuFoldOutlined />*/}
      {/*<MenuUnfoldOutlined />*/}
      {/*<BorderBottomOutlined />*/}
      {/*<BorderHorizontalOutlined />*/}
      {/*<BorderInnerOutlined />*/}
      {/*<BorderOuterOutlined />*/}
      {/*<BorderLeftOutlined />*/}
      {/*<BorderRightOutlined />*/}
      {/*<BorderTopOutlined />*/}
      {/*<BorderVerticleOutlined />*/}
      {/*<PicCenterOutlined />*/}
      {/*<PicLeftOutlined />*/}
      {/*<PicRightOutlined />*/}
      {/*<RadiusBottomleftOutlined />*/}
      {/*<RadiusBottomrightOutlined />*/}
      {/*<RadiusUpleftOutlined />*/}
      {/*<RadiusUprightOutlined />*/}
      {/*<FullscreenOutlined />*/}
      {/*<FullscreenExitOutlined />*/}
      {/*<QuestionOutlined />*/}
      {/*<PauseOutlined />*/}
      {/*<MinusOutlined />*/}
      {/*<PauseCircleOutlined />*/}
      {/*<InfoOutlined />*/}
      {/*<CloseOutlined />*/}
      {/*<ExclamationOutlined />*/}
      {/*<CheckOutlined />*/}
      {/*<WarningOutlined />*/}
      {/*<IssuesCloseOutlined />*/}
      {/*<StopOutlined />*/}
      {/*<EditOutlined />*/}
      {/*<CopyOutlined />*/}
      {/*<ScissorOutlined />*/}
      {/*<DeleteOutlined />*/}
      {/*<SnippetsOutlined />*/}
      {/*<DiffOutlined />*/}
      {/*<HighlightOutlined />*/}
      {/*<AlignCenterOutlined />*/}
      {/*<AlignLeftOutlined />*/}
      {/*<AlignRightOutlined />*/}
      {/*<BgColorsOutlined />*/}
      {/*<BoldOutlined />*/}
      {/*<ItalicOutlined />*/}
      {/*<UnderlineOutlined />*/}
      {/*<StrikethroughOutlined />*/}
      {/*<RedoOutlined />*/}
      {/*<UndoOutlined />*/}
      {/*<ZoomInOutlined />*/}
      {/*<ZoomOutOutlined />*/}
      {/*<FontColorsOutlined />*/}
      {/*<FontSizeOutlined />*/}
      {/*<LineHeightOutlined />*/}
      {/*<SortAscendingOutlined />*/}
      {/*<SortDescendingOutlined />*/}
      {/*<DragOutlined />*/}
      {/*<OrderedListOutlined />*/}
      {/*<UnorderedListOutlined />*/}
      {/*<RadiusSettingOutlined />*/}
      {/*<ColumnWidthOutlined />*/}
      {/*<ColumnHeightOutlined />*/}
      {/*<AreaChartOutlined />*/}
      {/*<PieChartOutlined />*/}
      {/*<BarChartOutlined />*/}
      {/*<DotChartOutlined />*/}
      {/*<LineChartOutlined />*/}
      {/*<RadarChartOutlined />*/}
      {/*<HeatMapOutlined />*/}
      {/*<FallOutlined />*/}
      {/*<RiseOutlined />*/}
      {/*<StockOutlined />*/}
      {/*<BoxPlotOutlined />*/}
      {/*<FundOutlined />*/}
      {/*<SlidersOutlined />*/}
      {/*<AndroidOutlined />*/}
      {/*<AppleOutlined />*/}
      {/*<WindowsOutlined />*/}
      {/*<IeOutlined />*/}
      {/*<ChromeOutlined />*/}
      {/*<GithubOutlined />*/}
      {/*<AliwangwangOutlined />*/}
      {/*<DingdingOutlined />*/}
      {/*<WeiboSquareOutlined />*/}
      {/*<WeiboCircleOutlined />*/}
      {/*<TaobaoCircleOutlined />*/}
      {/*<Html5Outlined />*/}
      {/*<WeiboOutlined />*/}
      {/*<TwitterOutlined />*/}
      {/*<WechatOutlined />*/}
      {/*<AlipayCircleOutlined />*/}
      {/*<TaobaoOutlined />*/}
      {/*<SkypeOutlined />*/}
      {/*<FacebookOutlined />*/}
      {/*<CodepenOutlined />*/}
      {/*<CodeSandboxOutlined />*/}
      {/*<AmazonOutlined />*/}
      {/*<GoogleOutlined />*/}
      {/*<AlipayOutlined />*/}
      {/*<AntDesignOutlined />*/}
      {/*<AntCloudOutlined />*/}
      {/*<ZhihuOutlined />*/}
      {/*<SlackOutlined />*/}
      {/*<SlackSquareOutlined />*/}
      {/*<BehanceSquareOutlined />*/}
      {/*<DribbbleOutlined />*/}
      {/*<DribbbleSquareOutlined />*/}
      {/*<InstagramOutlined />*/}
      {/*<YuqueOutlined />*/}
      {/*<AlibabaOutlined />*/}
      {/*<YahooOutlined />*/}
      {/*<RedditOutlined />*/}
      {/*<SketchOutlined />*/}
      {/*<AccountBookOutlined />*/}
      {/*<AlertOutlined />*/}
      {/*<ApartmentOutlined />*/}
      {/*<ApiOutlined />*/}
      {/*<QqOutlined />*/}
      {/*<MediumWorkmarkOutlined />*/}
      {/*<GitlabOutlined />*/}
      {/*<MediumOutlined />*/}
      {/*<GooglePlusOutlined />*/}
      {/*<AppstoreAddOutlined />*/}
      {/*<AppstoreOutlined />*/}
      {/*<AudioOutlined />*/}
      {/*<AudioMutedOutlined />*/}
      {/*<AuditOutlined />*/}
      {/*<BankOutlined />*/}
      {/*<BarcodeOutlined />*/}
      {/*<BarsOutlined />*/}
      {/*<BellOutlined />*/}
      {/*<BlockOutlined />*/}
      {/*<BookOutlined />*/}
      {/*<BorderOutlined />*/}
      {/*<BranchesOutlined />*/}
      {/*<BuildOutlined />*/}
      {/*<BulbOutlined />*/}
      {/*<CalculatorOutlined />*/}
      {/*<CalendarOutlined />*/}
      {/*<CameraOutlined />*/}
      {/*<CarOutlined />*/}
      {/*<CarryOutOutlined />*/}
      {/*<CiCircleOutlined />*/}
      {/*<CiOutlined />*/}
      {/*<CloudOutlined />*/}
      {/*<ClearOutlined />*/}
      {/*<ClusterOutlined />  */}
      {/*<CodeOutlined />*/}
      {/*<CoffeeOutlined />*/}
      {/*<CompassOutlined />*/}
      {/*<CompressOutlined />*/}
      {/*<ContactsOutlined />*/}
      {/*<ContainerOutlined />*/}
      {/*<ControlOutlined />*/}
      {/*<CopyrightCircleOutlined />*/}
      {/*<CopyrightOutlined />*/}
      {/*<CreditCardOutlined />*/}
      {/*<CrownOutlined />*/}
      {/*<CustomerServiceOutlined />*/}
      {/*<DashboardOutlined />*/}
      {/*<DatabaseOutlined />*/}
      {/*<DeleteColumnOutlined />*/}
      {/*<DeleteRowOutlined />*/}
      {/*<DisconnectOutlined />*/}
      {/*<DislikeOutlined />*/}
      {/*<DollarCircleOutlined />*/}
      {/*<DollarOutlined />*/}
      {/*<DownloadOutlined />*/}
      {/*<EllipsisOutlined />*/}
      {/*<EnvironmentOutlined />*/}
      {/*<EuroCircleOutlined />*/}
      {/*<EuroOutlined />*/}
      {/*<ExceptionOutlined />*/}
      {/*<ExpandAltOutlined />*/}
      {/*<ExpandOutlined />*/}
      {/*<ExperimentOutlined />*/}
      {/*<ExportOutlined />*/}
      {/*<EyeOutlined />*/}
      {/*<FieldBinaryOutlined />*/}
      {/*<FieldNumberOutlined />*/}
      {/*<FieldStringOutlined />*/}
      {/*<DesktopOutlined />*/}
      {/*<DingtalkOutlined />*/}
      {/*<FileAddOutlined />*/}
      {/*<FileDoneOutlined />*/}
      {/*<FileExcelOutlined />*/}
      {/*<FileExclamationOutlined />*/}
      {/*<FileOutlined />*/}
      {/*<FileImageOutlined />*/}
      {/*<FileJpgOutlined />*/}
      {/*<FileMarkdownOutlined />*/}
      {/*<FilePdfOutlined />*/}
      {/*<FilePptOutlined />*/}
      {/*<FileProtectOutlined />*/}
      {/*<FileSearchOutlined />*/}
      {/*<FileSyncOutlined />*/}
      {/*<FileTextOutlined />*/}
      {/*<FileUnknownOutlined />*/}
      {/*<FileWordOutlined />*/}
      {/*<FilterOutlined />*/}
      {/*<FireOutlined />*/}
      {/*<FlagOutlined />*/}
      {/*<FolderAddOutlined />*/}
      {/*<FolderOutlined />*/}
      {/*<FolderOpenOutlined />*/}
      {/*<ForkOutlined />*/}
      {/*<FormatPainterOutlined />*/}
      {/*<FrownOutlined />*/}
      {/*<FunctionOutlined />*/}
      {/*<FunnelPlotOutlined />*/}
      {/*<GatewayOutlined />*/}
      {/*<GifOutlined />*/}
      {/*<GiftOutlined />*/}
      {/*<GlobalOutlined />*/}
      {/*<GoldOutlined />*/}
      {/*<GroupOutlined />*/}
      {/*<HddOutlined />*/}
      {/*<HeartOutlined />*/}
      {/*<HistoryOutlined />*/}
      {/*<HomeOutlined />*/}
      {/*<HourglassOutlined />*/}
      {/*<IdcardOutlined />*/}
      {/*<ImportOutlined />*/}
      {/*<InboxOutlined />*/}
      {/*<InsertRowAboveOutlined />*/}
      {/*<InsertRowBelowOutlined />*/}
      {/*<InsertRowLeftOutlined />*/}
      {/*<InsertRowRightOutlined />*/}
      {/*<InsuranceOutlined />*/}
      {/*<InteractionOutlined />*/}
      {/*<KeyOutlined />*/}
      {/*<LaptopOutlined />*/}
      {/*<LayoutOutlined />*/}
      {/*<LikeOutlined />*/}
      {/*<LineOutlined />*/}
      {/*<LinkOutlined />*/}
      {/*<Loading3QuartersOutlined />*/}
      {/*<LoadingOutlined />*/}
      {/*<LockOutlined />*/}
      {/*<MailOutlined />*/}
      {/*<ManOutlined />*/}
      {/*<MedicineBoxOutlined />*/}
      {/*<MehOutlined />*/}
      {/*<MenuOutlined />*/}
      {/*<MergeCellsOutlined />*/}
      {/*<MessageOutlined />*/}
      {/*<MobileOutlined />*/}
      {/*<MoneyCollectOutlined />*/}
      {/*<MonitorOutlined />*/}
      {/*<MoreOutlined />*/}
      {/*<NodeCollapseOutlined />*/}
      {/*<NodeExpandOutlined />*/}
      {/*<NodeIndexOutlined />*/}
      {/*<NotificationOutlined />*/}
      {/*<NumberOutlined />*/}
      {/*<PaperClipOutlined />*/}
      {/*<PartitionOutlined />*/}
      {/*<PayCircleOutlined />*/}
      {/*<PercentageOutlined />*/}
      {/*<PhoneOutlined />*/}
      {/*<PictureOutlined />*/}
      {/*<PoundCircleOutlined />*/}
      {/*<PoundOutlined />*/}
      {/*<PoweroffOutlined />*/}
      {/*<PrinterOutlined />*/}
      {/*<ProfileOutlined />*/}
      {/*<ProjectOutlined />*/}
      {/*<PropertySafetyOutlined />*/}
      {/*<PullRequestOutlined />*/}
      {/*<PushpinOutlined />*/}
      {/*<QrcodeOutlined />*/}
      {/*<ReadOutlined />*/}
      {/*<ReconciliationOutlined />*/}
      {/*<RedEnvelopeOutlined />*/}
      {/*<ReloadOutlined />*/}
      {/*<RestOutlined />*/}
      {/*<RobotOutlined />*/}
      {/*<RocketOutlined />*/}

      {/*<SafetyCertificateOutlined />*/}
      {/*<SafetyOutlined />*/}
      {/*<ScanOutlined />*/}
      {/*<ScheduleOutlined />*/}
      {/*<SearchOutlined />*/}
      {/*<SecurityScanOutlined />*/}
      {/*<SelectOutlined />*/}
      {/*<SendOutlined />*/}
      {/*<SettingOutlined />*/}
      {/*<ShakeOutlined />*/}
      {/*<ShareAltOutlined />*/}
      {/*<ShopOutlined />*/}
      {/*<ShoppingCartOutlined />*/}
      {/*<ShoppingOutlined />*/}
      {/*<SisternodeOutlined />*/}
      {/*<SkinOutlined />*/}
      {/*<SmileOutlined />*/}
      {/*<SolutionOutlined />*/}
      {/*<SoundOutlined />*/}
      {/*<SplitCellsOutlined />*/}
      {/*<StarOutlined />*/}
      {/*<SubnodeOutlined />*/}
      {/*<SyncOutlined />*/}
      {/*<TableOutlined />*/}
      {/*<TabletOutlined />*/}
      {/*<TagOutlined />*/}
      {/*<TagsOutlined />*/}
      {/*<TeamOutlined />*/}
      {/*<ThunderboltOutlined />*/}
      {/*<ToTopOutlined />*/}
      {/*<ToolOutlined />*/}
      {/*<TrademarkCircleOutlined />*/}
      {/*<TrademarkOutlined />*/}
      {/*<TransactionOutlined />*/}
      {/*<TrophyOutlined />*/}
      {/*<UngroupOutlined />*/}
      {/*<UnlockOutlined />*/}
      {/*<UploadOutlined />*/}
      {/*<UsbOutlined />*/}
      {/*<UserAddOutlined />*/}
      {/*<UserDeleteOutlined />*/}
      {/*<UserOutlined />*/}
      {/*<UserSwitchOutlined />*/}
      {/*<UsergroupAddOutlined />*/}
      {/*<UsergroupDeleteOutlined />*/}
      {/*<VideoCameraOutlined />*/}
      {/*<WalletOutlined />*/}
      {/*<WifiOutlined />*/}
      {/*<WomanOutlined />*/}

      {/* 有错误的 SVG */}
      {/*<UpCircleOutlined />*/}
      {/*<DownCircleOutlined />*/}
      {/*<LeftCircleOutlined />*/}
      {/*<RightCircleOutlined />*/}
      {/*<UpSquareOutlined />*/}
      {/*<DownSquareOutlined />*/}
      {/*<LeftSquareOutlined />*/}
      {/*<RightSquareOutlined />*/}
      {/*<PlayCircleOutlined />*/}
      {/*<PlusOutlined />*/}
      {/*<QuestionCircleOutlined />*/}
      {/*<PlusCircleOutlined />*/}
      {/*<PlusSquareOutlined />*/}
      {/*<MinusSquareOutlined />*/}
      {/*<MinusCircleOutlined />*/}
      {/*<InfoCircleOutlined />*/}
      {/*<ExclamationCircleOutlined />*/}
      {/*<CloseCircleOutlined />*/}
      {/*<CloseSquareOutlined />*/}
      {/*  <CheckCircleOutlined />*/}
      {/*  <CheckSquareOutlined />*/}
      {/*  <ClockCircleOutlined />*/}
      {/*  <FormOutlined />*/}
      {/*<DashOutlined />*/}
      {/*<SmallDashOutlined />*/}
      {/*<YoutubeOutlined />*/}
      {/*<CodepenCircleOutlined />*/}
      {/*<AliyunOutlined />*/}
      {/*<BehanceOutlined />*/}
      <DropboxOutlined />
      {/*<LinkedinOutlined />*/}
      {/*<AimOutlined />*/}
      {/*  <BorderlessTableOutlined />*/}
      {/*<BugOutlined />*/}
      {/*<CloudDownloadOutlined />*/}
      {/*<CloudServerOutlined />*/}
      {/*<CloudSyncOutlined />*/}
      {/*<CloudUploadOutlined />*/}
      {/*  <CommentOutlined />*/}
      {/*  <ConsoleSqlOutlined />*/}
      {/*<EyeInvisibleOutlined />*/}
      {/*<DeploymentUnitOutlined /> 报错*/}
      {/*  <FileGifOutlined />*/}
      {/*<DeliveredProcedureOutlined />*/}
      {/*<FieldTimeOutlined />*/}
      {/*<FileZipOutlined />*/}
      {/*<FolderViewOutlined />*/}
      {/*  <FundProjectionScreenOutlined />*/}
      {/*  <FundViewOutlined />*/}
      {/*<MacCommandOutlined />*/}
      {/*<PlaySquareOutlined />*/}
      {/*<OneToOneOutlined />*/}
      {/*<RotateLeftOutlined />*/}
      {/*<RotateRightOutlined />*/}
      {/*<SaveOutlined />*/}
      {/*<SwitcherOutlined />*/}
      {/*<TranslationOutlined />*/}
      {/*<VerifiedOutlined />*/}
      {/*<VideoCameraAddOutlined />*/}
      {/*<WhatsAppOutlined />*/}

      {/*</Col>*/}
    </Row>
  );
};
export default IconSymbol;

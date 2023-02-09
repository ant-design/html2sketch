import { Row } from 'antd';
import React, { FC } from 'react';

import {
  AccountBookOutlined,
  AimOutlined,
  AlertOutlined,
  AlibabaOutlined,
  AlignCenterOutlined,
  AlignLeftOutlined,
  AlignRightOutlined,
  AlipayCircleOutlined,
  AlipayOutlined,
  AliwangwangOutlined,
  AliyunOutlined,
  AmazonOutlined,
  AndroidOutlined,
  AntCloudOutlined,
  AntDesignOutlined,
  ApartmentOutlined,
  ApiOutlined,
  AppleOutlined,
  AppstoreAddOutlined,
  AppstoreOutlined,
  AreaChartOutlined,
  ArrowDownOutlined,
  ArrowLeftOutlined,
  ArrowRightOutlined,
  ArrowsAltOutlined,
  ArrowUpOutlined,
  AudioMutedOutlined,
  AudioOutlined,
  AuditOutlined,
  BackwardOutlined,
  BankOutlined,
  BarChartOutlined,
  BarcodeOutlined,
  BarsOutlined,
  BehanceOutlined,
  BehanceSquareOutlined,
  BellOutlined,
  BgColorsOutlined,
  BlockOutlined,
  BoldOutlined,
  BookOutlined,
  BorderBottomOutlined,
  BorderHorizontalOutlined,
  BorderInnerOutlined,
  BorderLeftOutlined,
  BorderlessTableOutlined,
  BorderOuterOutlined,
  BorderOutlined,
  BorderRightOutlined,
  BorderTopOutlined,
  BorderVerticleOutlined,
  BoxPlotOutlined,
  BranchesOutlined,
  BugOutlined,
  BuildOutlined,
  BulbOutlined,
  CalculatorOutlined,
  CalendarOutlined,
  CameraOutlined,
  CaretDownOutlined,
  CaretLeftOutlined,
  CaretRightOutlined,
  CaretUpOutlined,
  CarOutlined,
  CarryOutOutlined,
  CheckCircleOutlined,
  CheckOutlined,
  CheckSquareOutlined,
  ChromeOutlined,
  CiCircleOutlined,
  CiOutlined,
  ClearOutlined,
  ClockCircleOutlined,
  CloseCircleOutlined,
  CloseOutlined,
  CloseSquareOutlined,
  CloudDownloadOutlined,
  CloudOutlined,
  CloudServerOutlined,
  CloudSyncOutlined,
  CloudUploadOutlined,
  ClusterOutlined,
  CodeOutlined,
  CodepenCircleOutlined,
  CodepenOutlined,
  CodeSandboxOutlined,
  CoffeeOutlined,
  ColumnHeightOutlined,
  ColumnWidthOutlined,
  CommentOutlined,
  CompassOutlined,
  CompressOutlined,
  ConsoleSqlOutlined,
  ContactsOutlined,
  ContainerOutlined,
  ControlOutlined,
  CopyOutlined,
  CopyrightCircleOutlined,
  CopyrightOutlined,
  CreditCardOutlined,
  CrownOutlined,
  CustomerServiceOutlined,
  DashboardOutlined,
  DashOutlined,
  DatabaseOutlined,
  DeleteColumnOutlined,
  DeleteOutlined,
  DeleteRowOutlined,
  DeliveredProcedureOutlined,
  DeploymentUnitOutlined,
  DesktopOutlined,
  DiffOutlined,
  DingdingOutlined,
  DingtalkOutlined,
  DisconnectOutlined,
  DislikeOutlined,
  DollarCircleOutlined,
  DollarOutlined,
  DotChartOutlined,
  DoubleLeftOutlined,
  DoubleRightOutlined,
  DownCircleOutlined,
  DownloadOutlined,
  DownOutlined,
  DownSquareOutlined,
  DragOutlined,
  DribbbleOutlined,
  DribbbleSquareOutlined,
  DropboxOutlined,
  EditOutlined,
  EllipsisOutlined,
  EnterOutlined,
  EnvironmentOutlined,
  EuroCircleOutlined,
  EuroOutlined,
  ExceptionOutlined,
  ExclamationCircleOutlined,
  ExclamationOutlined,
  ExpandAltOutlined,
  ExpandOutlined,
  ExperimentOutlined,
  ExportOutlined,
  EyeInvisibleOutlined,
  EyeOutlined,
  FacebookOutlined,
  FallOutlined,
  FastBackwardOutlined,
  FastForwardOutlined,
  FieldBinaryOutlined,
  FieldNumberOutlined,
  FieldStringOutlined,
  FieldTimeOutlined,
  FileAddOutlined,
  FileDoneOutlined,
  FileExcelOutlined,
  FileExclamationOutlined,
  FileGifOutlined,
  FileImageOutlined,
  FileJpgOutlined,
  FileMarkdownOutlined,
  FileOutlined,
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
  FolderOpenOutlined,
  FolderOutlined,
  FolderViewOutlined,
  FontColorsOutlined,
  FontSizeOutlined,
  ForkOutlined,
  FormatPainterOutlined,
  FormOutlined,
  ForwardOutlined,
  FrownOutlined,
  FullscreenExitOutlined,
  FullscreenOutlined,
  FunctionOutlined,
  FundOutlined,
  FundProjectionScreenOutlined,
  FundViewOutlined,
  FunnelPlotOutlined,
  GatewayOutlined,
  GifOutlined,
  GiftOutlined,
  GithubOutlined,
  GitlabOutlined,
  GlobalOutlined,
  GoldOutlined,
  GoogleOutlined,
  GooglePlusOutlined,
  GroupOutlined,
  HddOutlined,
  HeartOutlined,
  HeatMapOutlined,
  HighlightOutlined,
  HistoryOutlined,
  HomeOutlined,
  HourglassOutlined,
  Html5Outlined,
  IdcardOutlined,
  IeOutlined,
  ImportOutlined,
  InboxOutlined,
  InfoCircleOutlined,
  InfoOutlined,
  InsertRowAboveOutlined,
  InsertRowBelowOutlined,
  InsertRowLeftOutlined,
  InsertRowRightOutlined,
  InstagramOutlined,
  InsuranceOutlined,
  InteractionOutlined,
  IssuesCloseOutlined,
  ItalicOutlined,
  KeyOutlined,
  LaptopOutlined,
  LayoutOutlined,
  LeftCircleOutlined,
  LeftOutlined,
  LeftSquareOutlined,
  LikeOutlined,
  LineChartOutlined,
  LineHeightOutlined,
  LineOutlined,
  LinkedinOutlined,
  LinkOutlined,
  Loading3QuartersOutlined,
  LoadingOutlined,
  LockOutlined,
  LoginOutlined,
  LogoutOutlined,
  MacCommandOutlined,
  MailOutlined,
  ManOutlined,
  MedicineBoxOutlined,
  MediumOutlined,
  MediumWorkmarkOutlined,
  MehOutlined,
  MenuFoldOutlined,
  MenuOutlined,
  MenuUnfoldOutlined,
  MergeCellsOutlined,
  MessageOutlined,
  MinusCircleOutlined,
  MinusOutlined,
  MinusSquareOutlined,
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
  OrderedListOutlined,
  PaperClipOutlined,
  PartitionOutlined,
  PauseCircleOutlined,
  PauseOutlined,
  PayCircleOutlined,
  PercentageOutlined,
  PhoneOutlined,
  PicCenterOutlined,
  PicLeftOutlined,
  PicRightOutlined,
  PictureOutlined,
  PieChartOutlined,
  PlayCircleOutlined,
  PlaySquareOutlined,
  PlusCircleOutlined,
  PlusOutlined,
  PlusSquareOutlined,
  PoundCircleOutlined,
  PoundOutlined,
  PoweroffOutlined,
  PrinterOutlined,
  ProfileOutlined,
  ProjectOutlined,
  PropertySafetyOutlined,
  PullRequestOutlined,
  PushpinOutlined,
  QqOutlined,
  QrcodeOutlined,
  QuestionCircleOutlined,
  QuestionOutlined,
  RadarChartOutlined,
  RadiusBottomleftOutlined,
  RadiusBottomrightOutlined,
  RadiusSettingOutlined,
  RadiusUpleftOutlined,
  RadiusUprightOutlined,
  ReadOutlined,
  ReconciliationOutlined,
  RedditOutlined,
  RedEnvelopeOutlined,
  RedoOutlined,
  ReloadOutlined,
  RestOutlined,
  RetweetOutlined,
  RightCircleOutlined,
  RightOutlined,
  RightSquareOutlined,
  RiseOutlined,
  RobotOutlined,
  RocketOutlined,
  RollbackOutlined,
  RotateLeftOutlined,
  RotateRightOutlined,
  SafetyCertificateOutlined,
  SafetyOutlined,
  SaveOutlined,
  ScanOutlined,
  ScheduleOutlined,
  ScissorOutlined,
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
  ShrinkOutlined,
  SisternodeOutlined,
  SketchOutlined,
  SkinOutlined,
  SkypeOutlined,
  SlackOutlined,
  SlackSquareOutlined,
  SlidersOutlined,
  SmallDashOutlined,
  SmileOutlined,
  SnippetsOutlined,
  SolutionOutlined,
  SortAscendingOutlined,
  SortDescendingOutlined,
  SoundOutlined,
  SplitCellsOutlined,
  StarOutlined,
  StepForwardOutlined,
  StockOutlined,
  StopOutlined,
  StrikethroughOutlined,
  SubnodeOutlined,
  SwapLeftOutlined,
  SwapOutlined,
  SwapRightOutlined,
  SwitcherOutlined,
  SyncOutlined,
  TableOutlined,
  TabletOutlined,
  TagOutlined,
  TagsOutlined,
  TaobaoCircleOutlined,
  TaobaoOutlined,
  TeamOutlined,
  ThunderboltOutlined,
  ToolOutlined,
  ToTopOutlined,
  TrademarkCircleOutlined,
  TrademarkOutlined,
  TransactionOutlined,
  TranslationOutlined,
  TrophyOutlined,
  TwitterOutlined,
  UnderlineOutlined,
  UndoOutlined,
  UngroupOutlined,
  UnlockOutlined,
  UnorderedListOutlined,
  UpCircleOutlined,
  UploadOutlined,
  UpOutlined,
  UpSquareOutlined,
  UsbOutlined,
  UserAddOutlined,
  UserDeleteOutlined,
  UsergroupAddOutlined,
  UsergroupDeleteOutlined,
  UserOutlined,
  UserSwitchOutlined,
  VerifiedOutlined,
  VerticalAlignBottomOutlined,
  VerticalAlignMiddleOutlined,
  VerticalAlignTopOutlined,
  VerticalLeftOutlined,
  VerticalRightOutlined,
  VideoCameraAddOutlined,
  VideoCameraOutlined,
  WalletOutlined,
  WarningOutlined,
  WechatOutlined,
  WeiboCircleOutlined,
  WeiboOutlined,
  WeiboSquareOutlined,
  WhatsAppOutlined,
  WifiOutlined,
  WindowsOutlined,
  WomanOutlined,
  YahooOutlined,
  YoutubeOutlined,
  YuqueOutlined,
  ZhihuOutlined,
  ZoomInOutlined,
  ZoomOutOutlined,
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
      <StepForwardOutlined />
      <ShrinkOutlined />
      <ArrowsAltOutlined />
      <DownOutlined />
      <UpOutlined />
      <LeftOutlined />
      <RightOutlined />
      <CaretUpOutlined />
      <CaretDownOutlined />
      <CaretLeftOutlined />
      <CaretRightOutlined />
      <VerticalAlignTopOutlined />
      <RollbackOutlined />
      <FastBackwardOutlined />
      <FastForwardOutlined />
      <DoubleRightOutlined />
      <DoubleLeftOutlined />
      <VerticalLeftOutlined />
      <VerticalRightOutlined />
      <VerticalAlignMiddleOutlined />
      <VerticalAlignBottomOutlined />
      <ForwardOutlined />
      <BackwardOutlined />
      <EnterOutlined />
      <RetweetOutlined />
      <SwapOutlined />
      <SwapLeftOutlined />
      <SwapRightOutlined />
      <ArrowUpOutlined />
      <ArrowDownOutlined />
      <ArrowLeftOutlined />
      <ArrowRightOutlined />
      <LoginOutlined />
      <LogoutOutlined />
      <MenuFoldOutlined />
      <MenuUnfoldOutlined />
      <BorderBottomOutlined />
      <BorderHorizontalOutlined />
      <BorderInnerOutlined />
      <BorderOuterOutlined />
      <BorderLeftOutlined />
      <BorderRightOutlined />
      <BorderTopOutlined />
      <BorderVerticleOutlined />
      <PicCenterOutlined />
      <PicLeftOutlined />
      <PicRightOutlined />
      <RadiusBottomleftOutlined />
      <RadiusBottomrightOutlined />
      <RadiusUpleftOutlined />
      <RadiusUprightOutlined />
      <FullscreenOutlined />
      <FullscreenExitOutlined />
      <QuestionOutlined />
      <PauseOutlined />
      <MinusOutlined />
      <PauseCircleOutlined />
      <InfoOutlined />
      <CloseOutlined />
      <ExclamationOutlined />
      <CheckOutlined />
      <WarningOutlined />
      <IssuesCloseOutlined />
      <StopOutlined />
      <EditOutlined />
      <CopyOutlined />
      <ScissorOutlined />
      <DeleteOutlined />
      <SnippetsOutlined />
      <DiffOutlined />
      <HighlightOutlined />
      <AlignCenterOutlined />
      <AlignLeftOutlined />
      <AlignRightOutlined />
      <BgColorsOutlined />
      <BoldOutlined />
      <ItalicOutlined />
      <UnderlineOutlined />
      <StrikethroughOutlined />
      <RedoOutlined />
      <UndoOutlined />
      <ZoomInOutlined />
      <ZoomOutOutlined />
      <FontColorsOutlined />
      <FontSizeOutlined />
      <LineHeightOutlined />
      <SortAscendingOutlined />
      <SortDescendingOutlined />
      <DragOutlined />
      <OrderedListOutlined />
      <UnorderedListOutlined />
      <RadiusSettingOutlined />
      <ColumnWidthOutlined />
      <ColumnHeightOutlined />
      <AreaChartOutlined />
      <PieChartOutlined />
      <BarChartOutlined />
      <DotChartOutlined />
      <LineChartOutlined />
      <RadarChartOutlined />
      <HeatMapOutlined />
      <FallOutlined />
      <RiseOutlined />
      <StockOutlined />
      <BoxPlotOutlined />
      <FundOutlined />
      <SlidersOutlined />
      <AndroidOutlined />
      <AppleOutlined />
      <WindowsOutlined />
      <IeOutlined />
      <ChromeOutlined />
      <GithubOutlined />
      <AliwangwangOutlined />
      <DingdingOutlined />
      <WeiboSquareOutlined />
      <WeiboCircleOutlined />
      <TaobaoCircleOutlined />
      <Html5Outlined />
      <WeiboOutlined />
      <TwitterOutlined />
      <WechatOutlined />
      <AlipayCircleOutlined />
      <TaobaoOutlined />
      <SkypeOutlined />
      <FacebookOutlined />
      <CodepenOutlined />
      <CodeSandboxOutlined />
      <AmazonOutlined />
      <GoogleOutlined />
      <AlipayOutlined />
      <AntDesignOutlined />
      <AntCloudOutlined />
      <ZhihuOutlined />
      <SlackOutlined />
      <SlackSquareOutlined />
      <BehanceSquareOutlined />
      <DribbbleOutlined />
      <DribbbleSquareOutlined />
      <InstagramOutlined />
      <YuqueOutlined />
      <AlibabaOutlined />
      <YahooOutlined />
      <RedditOutlined />
      <SketchOutlined />
      <AccountBookOutlined />
      <AlertOutlined />
      <ApartmentOutlined />
      <ApiOutlined />
      <QqOutlined />
      <MediumWorkmarkOutlined />
      <GitlabOutlined />
      <MediumOutlined />
      <GooglePlusOutlined />
      <AppstoreAddOutlined />
      <AppstoreOutlined />
      <AudioOutlined />
      <AudioMutedOutlined />
      <AuditOutlined />
      <BankOutlined />
      <BarcodeOutlined />
      <BarsOutlined />
      <BellOutlined />
      <BlockOutlined />
      <BookOutlined />
      <BorderOutlined />
      <BranchesOutlined />
      <BuildOutlined />
      <BulbOutlined />
      <CalculatorOutlined />
      <CalendarOutlined />
      <CameraOutlined />
      <CarOutlined />
      <CarryOutOutlined />
      <CiCircleOutlined />
      <CiOutlined />
      <CloudOutlined />
      <ClearOutlined />
      <ClusterOutlined />
      <CodeOutlined />
      <CoffeeOutlined />
      <CompassOutlined />
      <CompressOutlined />
      <ContactsOutlined />
      <ContainerOutlined />
      <ControlOutlined />
      <CopyrightCircleOutlined />
      <CopyrightOutlined />
      <CreditCardOutlined />
      <CrownOutlined />
      <CustomerServiceOutlined />
      <DashboardOutlined />
      <DatabaseOutlined />
      <DeleteColumnOutlined />
      <DeleteRowOutlined />
      <DisconnectOutlined />
      <DislikeOutlined />
      <DollarCircleOutlined />
      <DollarOutlined />
      <DownloadOutlined />
      <EllipsisOutlined />
      <EnvironmentOutlined />
      <EuroCircleOutlined />
      <EuroOutlined />
      <ExceptionOutlined />
      <ExpandAltOutlined />
      <ExpandOutlined />
      <ExperimentOutlined />
      <ExportOutlined />
      <EyeOutlined />
      <FieldBinaryOutlined />
      <FieldNumberOutlined />
      <FieldStringOutlined />
      <DesktopOutlined />
      <DingtalkOutlined />
      <FileAddOutlined />
      <FileDoneOutlined />
      <FileExcelOutlined />
      <FileExclamationOutlined />
      <FileOutlined />
      <FileImageOutlined />
      <FileJpgOutlined />
      <FileMarkdownOutlined />
      <FilePdfOutlined />
      <FilePptOutlined />
      <FileProtectOutlined />
      <FileSearchOutlined />
      <FileSyncOutlined />
      <FileTextOutlined />
      <FileUnknownOutlined />
      <FileWordOutlined />
      <FilterOutlined />
      <FireOutlined />
      <FlagOutlined />
      <FolderAddOutlined />
      <FolderOutlined />
      <FolderOpenOutlined />
      <ForkOutlined />
      <FormatPainterOutlined />
      <FrownOutlined />
      <FunctionOutlined />
      <FunnelPlotOutlined />
      <GatewayOutlined />
      <GifOutlined />
      <GiftOutlined />
      <GlobalOutlined />
      <GoldOutlined />
      <GroupOutlined />
      <HddOutlined />
      <HeartOutlined />
      <HistoryOutlined />
      <HomeOutlined />
      <HourglassOutlined />
      <IdcardOutlined />
      <ImportOutlined />
      <InboxOutlined />
      <InsertRowAboveOutlined />
      <InsertRowBelowOutlined />
      <InsertRowLeftOutlined />
      <InsertRowRightOutlined />
      <InsuranceOutlined />
      <InteractionOutlined />
      <KeyOutlined />
      <LaptopOutlined />
      <LayoutOutlined />
      <LikeOutlined />
      <LineOutlined />
      <LinkOutlined />
      <Loading3QuartersOutlined />
      <LoadingOutlined />
      <LockOutlined />
      <MailOutlined />
      <ManOutlined />
      <MedicineBoxOutlined />
      <MehOutlined />
      <MenuOutlined />
      <MergeCellsOutlined />
      <MessageOutlined />
      <MobileOutlined />
      <MoneyCollectOutlined />
      <MonitorOutlined />
      <MoreOutlined />
      <NodeCollapseOutlined />
      <NodeExpandOutlined />
      <NodeIndexOutlined />
      <NotificationOutlined />
      <NumberOutlined />
      <PaperClipOutlined />
      <PartitionOutlined />
      <PayCircleOutlined />
      <PercentageOutlined />
      <PhoneOutlined />
      <PictureOutlined />
      <PoundCircleOutlined />
      <PoundOutlined />
      <PoweroffOutlined />
      <PrinterOutlined />
      <ProfileOutlined />
      <ProjectOutlined />
      <PropertySafetyOutlined />
      <PullRequestOutlined />
      <PushpinOutlined />
      <QrcodeOutlined />
      <ReadOutlined />
      <ReconciliationOutlined />
      <RedEnvelopeOutlined />
      <ReloadOutlined />
      <RestOutlined />
      <RobotOutlined />
      <RocketOutlined />
      <SafetyCertificateOutlined />
      <SafetyOutlined />
      <ScanOutlined />
      <ScheduleOutlined />
      <SearchOutlined />
      <SecurityScanOutlined />
      <SelectOutlined />
      <SendOutlined />
      <SettingOutlined />
      <ShakeOutlined />
      <ShareAltOutlined />
      <ShopOutlined />
      <ShoppingCartOutlined />
      <ShoppingOutlined />
      <SisternodeOutlined />
      <SkinOutlined />
      <SmileOutlined />
      <SolutionOutlined />
      <SoundOutlined />
      <SplitCellsOutlined />
      <StarOutlined />
      <SubnodeOutlined />
      <SyncOutlined />
      <TableOutlined />
      <TabletOutlined />
      <TagOutlined />
      <TagsOutlined />
      <TeamOutlined />
      <ThunderboltOutlined />
      <ToTopOutlined />
      <ToolOutlined />
      <TrademarkCircleOutlined />
      <TrademarkOutlined />
      <TransactionOutlined />
      <TrophyOutlined />
      <UngroupOutlined />
      <UnlockOutlined />
      <UploadOutlined />
      <UsbOutlined />
      <UserAddOutlined />
      <UserDeleteOutlined />
      <UserOutlined />
      <UserSwitchOutlined />
      <UsergroupAddOutlined />
      <UsergroupDeleteOutlined />
      <VideoCameraOutlined />
      <WalletOutlined />
      <WifiOutlined />
      <BorderlessTableOutlined />
      <WomanOutlined />
      <BehanceOutlined />
      <DropboxOutlined />
      <DeploymentUnitOutlined />
      <UpCircleOutlined />
      <DownCircleOutlined />
      <LeftCircleOutlined />
      <RightCircleOutlined />
      <UpSquareOutlined />
      <DownSquareOutlined />
      <LeftSquareOutlined />
      <RightSquareOutlined />
      <PlayCircleOutlined />
      <QuestionCircleOutlined />
      <PlusCircleOutlined />
      <PlusSquareOutlined />
      <MinusSquareOutlined />
      <MinusCircleOutlined />
      <InfoCircleOutlined />
      <ExclamationCircleOutlined />
      <CloseCircleOutlined />
      <CloseSquareOutlined />
      <CheckCircleOutlined />
      <CheckSquareOutlined />
      <ClockCircleOutlined />
      <FormOutlined />
      <DashOutlined />
      <SmallDashOutlined />
      <YoutubeOutlined />
      <CodepenCircleOutlined />
      <AliyunOutlined />
      <PlusOutlined />
      <LinkedinOutlined />
      <AimOutlined />
      <BugOutlined />
      <CloudDownloadOutlined />
      <CloudServerOutlined />
      <CloudSyncOutlined />
      <CloudUploadOutlined />
      <CommentOutlined />
      <ConsoleSqlOutlined />
      <EyeInvisibleOutlined />
      <FileGifOutlined />
      <DeliveredProcedureOutlined />
      <FieldTimeOutlined />
      <FileZipOutlined />
      <FolderViewOutlined />
      <FundProjectionScreenOutlined />
      <FundViewOutlined />
      <MacCommandOutlined />
      <PlaySquareOutlined />
      <OneToOneOutlined />
      <RotateLeftOutlined />
      <RotateRightOutlined />
      <SaveOutlined />
      <SwitcherOutlined />
      <TranslationOutlined />
      <VerifiedOutlined />
      <VideoCameraAddOutlined />
      <WhatsAppOutlined />

      {/*</Col>*/}
    </Row>
  );
};
export default IconSymbol;

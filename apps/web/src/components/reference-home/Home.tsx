import svgPaths from "./svg-1qdr0cemfv";
import imgFullImage from "./a54ffe563d6773bc2f60c942869ba6f6d13be927.png";
import imgThumbnail from "./817cfed82c580c1797e98cd2899a66a237a596c0.png";
import imgFullImage1 from "./a414256e0f2e38adbace65848e8d7ac41adebc32.png";
import imgFullImage2 from "./48674090da258a61c791cd00ca04f0ab5eae5098.png";
import imgFullImageContainer from "./ddf3929089901f919ccb5cec8bcef57269bad28d.png";
import imgFullImage3 from "./ca9b0d43c0a9a3e9707c0ffbdcb128a1d40e4f45.png";
import imgFullImage4 from "./356eeb935f5a39de2e9ab67426a8bc8942bce0d9.png";
import imgExhibitionFullImage from "./d236e945a5044c14489b2e7ea53c5604cf70cc94.png";
import imgExhibitionFullImage1 from "./c7d7122132398baf8c2664cd0d16250039849475.png";
import imgExhibitionImage from "./e9323ff8ffb7ccb4f690c77098e1e1820215ab23.png";
import imgHeroBanner2 from "./8ab53a40f6f21db6e5a8469000a2cd38a9fe5cbe.png";
import imgHeroImage from "./c835b8583dd9faa532e167e3eea5630c2f4231fe.png";

function ImageContainer() {
  return (
    <div className="absolute bg-white left-0 overflow-clip rounded-[1255px] size-[441px] top-0" data-name="Image Container">
      <div className="absolute h-[718px] left-0 top-[-161px] w-[1008px]" data-name="Full Image">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgFullImage.src} />
      </div>
    </div>
  );
}

function ImageTextContainer() {
  return (
    <div className="content-stretch flex gap-[10px] h-[441px] items-start relative shrink-0 w-full" data-name="Image Text Container">
      <ImageContainer />
      <div className="relative shrink-0 size-[104px]" data-name="Thumbnail">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgThumbnail.src} />
      </div>
    </div>
  );
}

function ExhibitionUntilContainer() {
  return (
    <div className="content-stretch flex gap-[7px] items-center relative shrink-0 text-[20px]" data-name="Exhibition Until Container">
      <p className="relative shrink-0">Exhibition until</p>
      <p className="relative shrink-0">29 JAN</p>
    </div>
  );
}

function TitleContainer() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 whitespace-nowrap" data-name="Title Container">
      <p className="relative shrink-0 text-[50px]">Origins visions</p>
      <ExhibitionUntilContainer />
    </div>
  );
}

function TitleTextContainer() {
  return (
    <div className="[word-break:break-word] content-stretch flex flex-col font-['29LT_Azer:Regular',sans-serif] gap-[16px] items-start leading-[normal] not-italic relative shrink-0 text-black w-full" data-name="Title Text Container">
      <TitleContainer />
      <p className="min-w-full relative shrink-0 text-[20px] w-[min-content]">{`Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet `}</p>
    </div>
  );
}

function LearnMoreButtonCenter() {
  return (
    <div className="relative rounded-[103px] shrink-0 w-full" data-name="Learn More Button Center">
      <div aria-hidden className="absolute border border-[#253646] border-solid inset-0 pointer-events-none rounded-[103px]" />
      <div className="flex flex-row items-center justify-center size-full">
        <div className="content-stretch flex items-center justify-center pb-[3px] pt-[6px] px-[10px] relative size-full">
          <p className="[word-break:break-word] font-['29LT_Azer:Regular',sans-serif] leading-[normal] not-italic relative shrink-0 text-[20px] text-black whitespace-nowrap">Learn more</p>
        </div>
      </div>
    </div>
  );
}

function DetailsContainer() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-end relative shrink-0 w-full" data-name="Details Container">
      <TitleTextContainer />
      <div className="content-stretch flex flex-col items-end p-[10px] relative shrink-0 w-[123px]" data-name="Learn More Button Container">
        <LearnMoreButtonCenter />
      </div>
    </div>
  );
}

function ExhibitionInfoContainer() {
  return (
    <div className="content-stretch flex flex-col gap-[24px] items-start relative shrink-0 w-[441px]" data-name="Exhibition Info Container">
      <ImageTextContainer />
      <DetailsContainer />
    </div>
  );
}

function ImageContainer1() {
  return (
    <div className="absolute bg-white left-0 overflow-clip rounded-[1255px] size-[441px] top-0" data-name="Image Container">
      <div className="absolute h-[434px] left-[-175px] top-[7px] w-[632px]" data-name="Full Image">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgFullImage1.src} />
      </div>
    </div>
  );
}

function ImageTextContainer1() {
  return (
    <div className="content-stretch flex gap-[10px] h-[441px] items-start relative shrink-0 w-full" data-name="Image Text Container">
      <ImageContainer1 />
      <div className="relative shrink-0 size-[104px]" data-name="Thumbnail">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgThumbnail.src} />
      </div>
    </div>
  );
}

function ExhibitionUntilContainer1() {
  return (
    <div className="content-stretch flex gap-[7px] items-center relative shrink-0 text-[20px]" data-name="Exhibition Until Container">
      <p className="relative shrink-0">Exhibition until</p>
      <p className="relative shrink-0">29 JAN</p>
    </div>
  );
}

function TitleContainer1() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[235px] whitespace-nowrap" data-name="Title Container">
      <p className="relative shrink-0 text-[50px]">Dubai fishing village</p>
      <ExhibitionUntilContainer1 />
    </div>
  );
}

function TitleTextContainer1() {
  return (
    <div className="[word-break:break-word] content-stretch flex flex-col font-['29LT_Azer:Regular',sans-serif] gap-[16px] items-start leading-[normal] not-italic relative shrink-0 text-black w-full" data-name="Title Text Container">
      <TitleContainer1 />
      <p className="min-w-full relative shrink-0 text-[20px] w-[min-content]">{`Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet `}</p>
    </div>
  );
}

function LearnMoreButtonCenter1() {
  return (
    <div className="relative rounded-[103px] shrink-0 w-full" data-name="Learn More Button Center">
      <div aria-hidden className="absolute border border-[#253646] border-solid inset-0 pointer-events-none rounded-[103px]" />
      <div className="flex flex-row items-center justify-center size-full">
        <div className="content-stretch flex items-center justify-center pb-[3px] pt-[6px] px-[10px] relative size-full">
          <p className="[word-break:break-word] font-['29LT_Azer:Regular',sans-serif] leading-[normal] not-italic relative shrink-0 text-[20px] text-black whitespace-nowrap">Learn more</p>
        </div>
      </div>
    </div>
  );
}

function DetailsContainer1() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-end relative shrink-0 w-full" data-name="Details Container">
      <TitleTextContainer1 />
      <div className="content-stretch flex flex-col items-end p-[10px] relative shrink-0 w-[123px]" data-name="Learn More Button Container">
        <LearnMoreButtonCenter1 />
      </div>
    </div>
  );
}

function ExhibitionInfoContainer1() {
  return (
    <div className="content-stretch flex flex-col gap-[24px] items-start relative shrink-0 w-[441px]" data-name="Exhibition Info Container">
      <ImageTextContainer1 />
      <DetailsContainer1 />
    </div>
  );
}

function ImageContainer2() {
  return (
    <div className="absolute bg-white left-0 overflow-clip rounded-[1255px] size-[441px] top-0" data-name="Image Container">
      <div className="absolute h-[582px] left-[-248px] top-[-46px] w-[847px]" data-name="Full Image">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgFullImage2.src} />
      </div>
    </div>
  );
}

function ImageTextContainer2() {
  return (
    <div className="content-stretch flex gap-[10px] h-[441px] items-start relative shrink-0 w-full" data-name="Image Text Container">
      <ImageContainer2 />
      <div className="relative shrink-0 size-[104px]" data-name="Thumbnail">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgThumbnail.src} />
      </div>
    </div>
  );
}

function ExhibitionUntilContainer2() {
  return (
    <div className="content-stretch flex gap-[7px] items-center relative shrink-0 text-[20px]" data-name="Exhibition Until Container">
      <p className="relative shrink-0">Exhibition until</p>
      <p className="relative shrink-0">29 JAN</p>
    </div>
  );
}

function TitleContainer2() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[235px] whitespace-nowrap" data-name="Title Container">
      <p className="relative shrink-0 text-[50px]">Vernacular architecture</p>
      <ExhibitionUntilContainer2 />
    </div>
  );
}

function TitleTextContainer2() {
  return (
    <div className="[word-break:break-word] content-stretch flex flex-col font-['29LT_Azer:Regular',sans-serif] gap-[16px] items-start leading-[normal] not-italic relative shrink-0 text-black w-full" data-name="Title Text Container">
      <TitleContainer2 />
      <p className="min-w-full relative shrink-0 text-[20px] w-[min-content]">{`Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet `}</p>
    </div>
  );
}

function LearnMoreButtonCenter2() {
  return (
    <div className="relative rounded-[103px] shrink-0 w-full" data-name="Learn More Button Center">
      <div aria-hidden className="absolute border border-[#253646] border-solid inset-0 pointer-events-none rounded-[103px]" />
      <div className="flex flex-row items-center justify-center size-full">
        <div className="content-stretch flex items-center justify-center pb-[3px] pt-[6px] px-[10px] relative size-full">
          <p className="[word-break:break-word] font-['29LT_Azer:Regular',sans-serif] leading-[normal] not-italic relative shrink-0 text-[20px] text-black whitespace-nowrap">Learn more</p>
        </div>
      </div>
    </div>
  );
}

function DetailsContainer2() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-end relative shrink-0 w-full" data-name="Details Container">
      <TitleTextContainer2 />
      <div className="content-stretch flex flex-col items-end p-[10px] relative shrink-0 w-[123px]" data-name="Learn More Button Container">
        <LearnMoreButtonCenter2 />
      </div>
    </div>
  );
}

function ExhibitionInfoContainer2() {
  return (
    <div className="content-stretch flex flex-col gap-[24px] items-start relative shrink-0 w-[442px]" data-name="Exhibition Info Container">
      <ImageTextContainer2 />
      <DetailsContainer2 />
    </div>
  );
}

function HorizontalExhibitionContainer() {
  return (
    <div className="absolute content-stretch flex gap-[22px] items-center left-[36px] top-[1596px]" data-name="Horizontal Exhibition Container">
      <ExhibitionInfoContainer />
      <ExhibitionInfoContainer1 />
      <ExhibitionInfoContainer2 />
    </div>
  );
}

function FullImageContainer() {
  return (
    <div className="h-[445px] relative shrink-0 w-full" data-name="Full Image Container">
      <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgFullImageContainer.src} />
      <div className="content-stretch flex items-start pl-[64px] pr-[62px] py-[3px] relative size-full">
        <div className="h-[439px] relative shrink-0 w-[319px]" data-name="Full Image">
          <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgFullImage3.src} />
        </div>
      </div>
    </div>
  );
}

function ImageTextContainer3() {
  return (
    <div className="content-stretch flex flex-col h-[445px] items-start justify-center relative shrink-0 w-full" data-name="Image Text Container">
      <FullImageContainer />
      <div className="absolute left-0 size-[104px] top-0" data-name="Thumbnail">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgThumbnail.src} />
      </div>
    </div>
  );
}

function ExhibitionUntilContainer3() {
  return (
    <div className="content-stretch flex gap-[7px] items-center relative shrink-0 text-[20px] whitespace-nowrap" data-name="Exhibition Until Container">
      <p className="relative shrink-0">Exhibition until</p>
      <p className="relative shrink-0">29 JAN</p>
    </div>
  );
}

function TitleContainer3() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Title Container">
      <p className="relative shrink-0 text-[50px] w-[437px]">Power of ceremonials</p>
      <ExhibitionUntilContainer3 />
    </div>
  );
}

function TitleTextContainer3() {
  return (
    <div className="[word-break:break-word] content-stretch flex flex-col font-['29LT_Azer:Regular',sans-serif] gap-[16px] items-start leading-[normal] not-italic relative shrink-0 text-black w-full" data-name="Title Text Container">
      <TitleContainer3 />
      <p className="min-w-full relative shrink-0 text-[20px] w-[min-content]">{`Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. `}</p>
    </div>
  );
}

function LearnMoreButtonCenter3() {
  return (
    <div className="relative rounded-[103px] shrink-0 w-full" data-name="Learn More Button Center">
      <div aria-hidden className="absolute border border-[#253646] border-solid inset-0 pointer-events-none rounded-[103px]" />
      <div className="flex flex-row items-center justify-center size-full">
        <div className="content-stretch flex items-center justify-center pb-[3px] pt-[6px] px-[10px] relative size-full">
          <p className="[word-break:break-word] font-['29LT_Azer:Regular',sans-serif] leading-[normal] not-italic relative shrink-0 text-[20px] text-black whitespace-nowrap">Learn more</p>
        </div>
      </div>
    </div>
  );
}

function DetailsContainer3() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-end relative shrink-0 w-full" data-name="Details Container">
      <TitleTextContainer3 />
      <div className="content-stretch flex flex-col items-end p-[10px] relative shrink-0 w-[123px]" data-name="Learn More Button Container">
        <LearnMoreButtonCenter3 />
      </div>
    </div>
  );
}

function ExhibitionVerticalContainer() {
  return (
    <div className="content-stretch flex flex-col gap-[39px] items-start relative shrink-0 w-[445px]" data-name="Exhibition Vertical Container">
      <ImageTextContainer3 />
      <DetailsContainer3 />
    </div>
  );
}

function ImageContainer3() {
  return (
    <div className="bg-white h-[461px] overflow-clip relative rounded-[300px] shrink-0 w-[904px]" data-name="Image Container">
      <div className="absolute h-[749px] left-[-49px] top-[-268px] w-[1089px]" data-name="Full Image">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <img alt="" className="absolute h-full left-[-0.66%] max-w-none top-[7.27%] w-[100.05%]" src={imgFullImage4.src} />
        </div>
      </div>
    </div>
  );
}

function ContentContainer() {
  return (
    <div className="content-stretch flex items-start relative shrink-0 w-full" data-name="Content Container">
      <ImageContainer3 />
      <div className="absolute left-0 size-[104px] top-0" data-name="Thumbnail">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgThumbnail.src} />
      </div>
    </div>
  );
}

function ExhibitionUntilContainer4() {
  return (
    <div className="content-stretch flex gap-[7px] items-center leading-[normal] relative shrink-0 text-[20px] whitespace-nowrap" data-name="Exhibition Until Container">
      <p className="relative shrink-0">Exhibition until</p>
      <p className="relative shrink-0">29 JAN</p>
    </div>
  );
}

function TitleTextContainer4() {
  return (
    <div className="[word-break:break-word] content-stretch flex flex-col font-['29LT_Azer:Regular',sans-serif] items-start not-italic relative shrink-0 text-black" data-name="Title Text Container">
      <div className="leading-[0] relative shrink-0 text-[50px] w-[437px] whitespace-pre-wrap">
        <p className="leading-[normal] mb-0">{`A place where  `}</p>
        <p className="leading-[normal]">history meets future</p>
      </div>
      <ExhibitionUntilContainer4 />
    </div>
  );
}

function LearnMoreButtonCenter4() {
  return (
    <div className="relative rounded-[103px] shrink-0 w-full" data-name="Learn More Button Center">
      <div aria-hidden className="absolute border border-[#253646] border-solid inset-0 pointer-events-none rounded-[103px]" />
      <div className="flex flex-row items-center justify-center size-full">
        <div className="content-stretch flex items-center justify-center pb-[3px] pt-[6px] px-[10px] relative size-full">
          <p className="[word-break:break-word] font-['29LT_Azer:Regular',sans-serif] leading-[normal] not-italic relative shrink-0 text-[20px] text-black whitespace-nowrap">Learn more</p>
        </div>
      </div>
    </div>
  );
}

function DescriptionContainer() {
  return (
    <div className="content-stretch flex flex-col gap-[10px] items-end relative shrink-0 w-[443px]" data-name="Description Container">
      <p className="[word-break:break-word] font-['29LT_Azer:Regular',sans-serif] leading-[normal] min-w-full not-italic relative shrink-0 text-[20px] text-black w-[min-content]">{`Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation `}</p>
      <div className="content-stretch flex flex-col items-end p-[10px] relative shrink-0 w-[123px]" data-name="Learn More Button Container">
        <LearnMoreButtonCenter4 />
      </div>
    </div>
  );
}

function DetailsContainer4() {
  return (
    <div className="content-stretch flex gap-[25px] items-start relative shrink-0 w-full" data-name="Details Container">
      <TitleTextContainer4 />
      <DescriptionContainer />
    </div>
  );
}

function ExhibitionInfoContainer3() {
  return (
    <div className="content-stretch flex flex-col gap-[24px] items-start relative shrink-0 w-[905px]" data-name="Exhibition Info Container">
      <ContentContainer />
      <DetailsContainer4 />
    </div>
  );
}

function VerticalExhibitionsContainer() {
  return (
    <div className="absolute content-stretch flex items-start justify-between left-[36px] top-[879px] w-[1368px]" data-name="Vertical Exhibitions Container">
      <ExhibitionVerticalContainer />
      <ExhibitionInfoContainer3 />
    </div>
  );
}

function ExhibitionImageContainer() {
  return (
    <div className="bg-white h-[461px] overflow-clip relative rounded-[300px] shrink-0 w-[904px]" data-name="Exhibition Image Container">
      <div className="absolute h-[484px] left-[-23px] top-[-11px] w-[1000px]" data-name="Exhibition Full Image">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <img alt="" className="absolute h-[140.04%] left-[-1.71%] max-w-none top-[-13.96%] w-[101.71%]" src={imgExhibitionFullImage.src} />
        </div>
      </div>
    </div>
  );
}

function ExhibitionContentContainer() {
  return (
    <div className="content-stretch flex items-start relative shrink-0 w-full" data-name="Exhibition Content Container">
      <ExhibitionImageContainer />
      <div className="absolute left-0 size-[104px] top-0" data-name="Exhibition Thumbnail">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgThumbnail.src} />
      </div>
    </div>
  );
}

function ExhibitionUntilContainer5() {
  return (
    <div className="content-stretch flex gap-[7px] items-center relative shrink-0 text-[20px] whitespace-nowrap" data-name="Exhibition Until Container">
      <p className="relative shrink-0">Exhibition until</p>
      <p className="relative shrink-0">29 JAN</p>
    </div>
  );
}

function ExhibitionTitleContainer() {
  return (
    <div className="[word-break:break-word] content-stretch flex flex-col font-['29LT_Azer:Regular',sans-serif] items-start leading-[normal] not-italic relative shrink-0 text-black" data-name="Exhibition Title Container">
      <p className="relative shrink-0 text-[50px] w-[437px]">Back to the source</p>
      <ExhibitionUntilContainer5 />
    </div>
  );
}

function LearnMoreButtonCenter5() {
  return (
    <div className="relative rounded-[103px] shrink-0 w-full" data-name="Learn More Button Center">
      <div aria-hidden className="absolute border border-[#253646] border-solid inset-0 pointer-events-none rounded-[103px]" />
      <div className="flex flex-row items-center justify-center size-full">
        <div className="content-stretch flex items-center justify-center pb-[3px] pt-[6px] px-[10px] relative size-full">
          <p className="[word-break:break-word] font-['29LT_Azer:Regular',sans-serif] leading-[normal] not-italic relative shrink-0 text-[20px] text-black whitespace-nowrap">Learn more</p>
        </div>
      </div>
    </div>
  );
}

function ExhibitionDescriptionContainer() {
  return (
    <div className="content-stretch flex flex-col gap-[10px] items-end relative shrink-0 w-[443px]" data-name="Exhibition Description Container">
      <p className="[word-break:break-word] font-['29LT_Azer:Regular',sans-serif] leading-[normal] min-w-full not-italic relative shrink-0 text-[20px] text-black w-[min-content]">{`Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation `}</p>
      <div className="content-stretch flex flex-col items-end p-[10px] relative shrink-0 w-[123px]" data-name="Learn More Button Container">
        <LearnMoreButtonCenter5 />
      </div>
    </div>
  );
}

function ExhibitionDetailsContainer() {
  return (
    <div className="content-stretch flex gap-[25px] items-start relative shrink-0 w-full" data-name="Exhibition Details Container">
      <ExhibitionTitleContainer />
      <ExhibitionDescriptionContainer />
    </div>
  );
}

function ExhibitionInfoContainer4() {
  return (
    <div className="content-stretch flex flex-col gap-[24px] items-start relative shrink-0 w-[905px]" data-name="Exhibition Info Container">
      <ExhibitionContentContainer />
      <ExhibitionDetailsContainer />
    </div>
  );
}

function ExhibitionImageTextContainer() {
  return (
    <div className="content-stretch flex flex-col h-[445px] items-start justify-center relative shrink-0 w-full" data-name="Exhibition Image Text Container">
      <div className="relative rounded-[1020px] shrink-0 size-[445px]" data-name="Exhibition Full Image">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[1020px] size-full" src={imgExhibitionFullImage1.src} />
      </div>
      <div className="absolute left-0 size-[104px] top-0" data-name="Exhibition Thumbnail">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgThumbnail.src} />
      </div>
    </div>
  );
}

function ExhibitionUntilContainer6() {
  return (
    <div className="content-stretch flex gap-[7px] items-center relative shrink-0 text-[20px] whitespace-nowrap" data-name="Exhibition Until Container">
      <p className="relative shrink-0">Exhibition until</p>
      <p className="relative shrink-0">29 JAN</p>
    </div>
  );
}

function ExhibitionTitleContainer1() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Exhibition Title Container">
      <p className="relative shrink-0 text-[50px] w-[437px]">Power of ceremonials</p>
      <ExhibitionUntilContainer6 />
    </div>
  );
}

function ExhibitionTitleTextContainer() {
  return (
    <div className="[word-break:break-word] content-stretch flex flex-col font-['29LT_Azer:Regular',sans-serif] gap-[16px] items-start leading-[normal] not-italic relative shrink-0 text-black w-full" data-name="Exhibition Title Text Container">
      <ExhibitionTitleContainer1 />
      <p className="min-w-full relative shrink-0 text-[20px] w-[min-content]">{`Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. `}</p>
    </div>
  );
}

function LearnMoreButtonCenter6() {
  return (
    <div className="relative rounded-[103px] shrink-0 w-full" data-name="Learn More Button Center">
      <div aria-hidden className="absolute border border-[#253646] border-solid inset-0 pointer-events-none rounded-[103px]" />
      <div className="flex flex-row items-center justify-center size-full">
        <div className="content-stretch flex items-center justify-center pb-[3px] pt-[6px] px-[10px] relative size-full">
          <p className="[word-break:break-word] font-['29LT_Azer:Regular',sans-serif] leading-[normal] not-italic relative shrink-0 text-[20px] text-black whitespace-nowrap">Learn more</p>
        </div>
      </div>
    </div>
  );
}

function ExhibitionDetailsContainer1() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-end relative shrink-0 w-full" data-name="Exhibition Details Container">
      <ExhibitionTitleTextContainer />
      <div className="content-stretch flex flex-col items-end p-[10px] relative shrink-0 w-[123px]" data-name="Learn More Button Container">
        <LearnMoreButtonCenter6 />
      </div>
    </div>
  );
}

function ExhibitionVerticalContainer1() {
  return (
    <div className="content-stretch flex flex-col gap-[39px] items-start relative shrink-0 w-[445px]" data-name="Exhibition Vertical Container">
      <ExhibitionImageTextContainer />
      <ExhibitionDetailsContainer1 />
    </div>
  );
}

function HorizontalExhibitionContainer1() {
  return (
    <div className="absolute bg-[#e9ebec] content-stretch flex items-start justify-between left-0 px-[36px] py-[32px] right-0 top-[3135px]" data-name="Horizontal Exhibition Container">
      <ExhibitionInfoContainer4 />
      <ExhibitionVerticalContainer1 />
    </div>
  );
}

function CircularImagesContainer() {
  return (
    <div className="absolute contents left-[85px] top-[179px]" data-name="Circular Images Container">
      <div className="absolute left-[85px] size-[574px] top-[194px]">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 574 574">
          <circle cx="287" cy="287" fill="var(--fill-0, #66727E)" id="Ellipse 2" r="287" />
        </svg>
      </div>
      <div className="absolute h-[625px] left-[145px] top-[179px] w-[454px]" data-name="Circular Image">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgFullImage3.src} />
      </div>
    </div>
  );
}

function ExhibitionUntilContainer7() {
  return (
    <div className="content-stretch flex gap-[7px] items-center leading-[normal] relative shrink-0 text-[20px] whitespace-nowrap" data-name="Exhibition Until Container">
      <p className="relative shrink-0 text-white">Exhibition until</p>
      <p className="relative shrink-0 text-[#d3d7da]">29 JAN</p>
    </div>
  );
}

function PowerOfCeremonialsTextContainer() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Power of Ceremonials Text Container">
      <p className="leading-[42px] relative shrink-0 text-[#d3d7da] text-[50px] w-[230px]">Power of ceremonials</p>
      <ExhibitionUntilContainer7 />
    </div>
  );
}

function PowerOfCeremonialsContainer() {
  return (
    <div className="[word-break:break-word] absolute content-stretch flex flex-col font-['29LT_Azer:Regular',sans-serif] gap-[6px] items-start left-[85px] not-italic top-[75px] w-[230px]" data-name="Power of Ceremonials Container">
      <PowerOfCeremonialsTextContainer />
      <p className="leading-[normal] min-w-full relative shrink-0 text-[#d3d7da] text-[20px] w-[min-content]">{`Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. `}</p>
    </div>
  );
}

function ExhibitionUntilContainer8() {
  return (
    <div className="content-stretch flex gap-[7px] items-center leading-[normal] relative shrink-0 text-[20px] whitespace-nowrap" data-name="Exhibition Until Container">
      <p className="relative shrink-0 text-white">Exhibition until</p>
      <p className="relative shrink-0 text-[#d3d7da]">29 JAN</p>
    </div>
  );
}

function ConservationTextContainer() {
  return (
    <div className="[word-break:break-word] content-stretch flex flex-col font-['29LT_Azer:Regular',sans-serif] items-start not-italic relative shrink-0" data-name="Conservation Text Container">
      <div className="leading-[0] relative shrink-0 text-[#d3d7da] text-[50px] w-[262px] whitespace-pre-wrap">
        <p className="leading-[42px] mb-0">{`Conservation `}</p>
        <p className="leading-[42px]">and care</p>
      </div>
      <ExhibitionUntilContainer8 />
    </div>
  );
}

function ConservationContainer() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-[947px] top-[552px] w-[230px]" data-name="Conservation Container">
      <ConservationTextContainer />
    </div>
  );
}

function ExhibitionContainer() {
  return (
    <div className="absolute content-stretch flex items-center justify-center left-[36px] px-[15px] py-[2px] rounded-[100px] top-[24px] w-[166px]" data-name="Exhibition Container">
      <div aria-hidden className="absolute border border-[#d3d7da] border-solid inset-0 pointer-events-none rounded-[100px]" />
      <p className="[word-break:break-word] font-['29LT_Azer:Regular',sans-serif] leading-[normal] not-italic relative shrink-0 text-[#d3d7da] text-[30px] whitespace-nowrap">Exhibition</p>
    </div>
  );
}

function GuideTourContainer() {
  return (
    <div className="absolute content-stretch flex items-center justify-center left-[816px] px-[15px] py-[2px] rounded-[100px] top-[786px] w-[166px]" data-name="Guide Tour Container">
      <div aria-hidden className="absolute border border-[#d3d7da] border-solid inset-0 pointer-events-none rounded-[100px]" />
      <p className="[word-break:break-word] font-['29LT_Azer:Regular',sans-serif] leading-[normal] not-italic relative shrink-0 text-[#d3d7da] text-[30px] whitespace-nowrap">Guide Tour</p>
    </div>
  );
}

function ExhibitionGuidedTour() {
  return (
    <div className="absolute bg-[#243646] h-[860px] left-0 overflow-clip right-0 top-[2273px]" data-name="Exhibition & Guided tour">
      <CircularImagesContainer />
      <div className="absolute flex h-[214px] items-center justify-center left-[208px] top-[31px] w-[350px]">
        <div className="flex-none rotate-[31.44deg]">
          <div className="h-0 relative w-[410.239px]">
            <div className="absolute inset-[-1px_0_0_0]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 410.239 1">
                <line id="Line 1" stroke="var(--stroke-0, #D3D7DA)" x2="410.239" y1="0.5" y2="0.5" />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute flex h-[485px] items-center justify-center left-[816px] top-[294px] w-[144px]">
        <div className="flex-none rotate-[-73.46deg]">
          <div className="h-0 relative w-[505.926px]">
            <div className="absolute inset-[-1px_0_0_0]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 505.926 1">
                <line id="Line 3" stroke="var(--stroke-0, #D3D7DA)" x2="505.926" y1="0.5" y2="0.5" />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute flex h-[466px] items-center justify-center left-[36px] top-[56px] w-[42px]">
        <div className="flex-none rotate-[84.85deg]">
          <div className="h-0 relative w-[467.889px]">
            <div className="absolute inset-[-1px_0_0_0]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 467.889 1">
                <line id="Line 2" stroke="var(--stroke-0, #D3D7DA)" x2="467.889" y1="0.5" y2="0.5" />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <PowerOfCeremonialsContainer />
      <ConservationContainer />
      <ExhibitionContainer />
      <GuideTourContainer />
      <div className="absolute h-[455px] left-[951px] top-[77px] w-[453px]" data-name="Exhibition Image">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <img alt="" className="absolute h-full left-[-46.94%] max-w-none top-0 w-[180.25%]" src={imgExhibitionImage.src} />
        </div>
      </div>
      <div className="absolute flex h-[271px] items-center justify-center left-[986px] top-[537px] w-[418px]">
        <div className="flex-none rotate-[-32.96deg]">
          <div className="h-0 relative w-[498.162px]">
            <div className="absolute inset-[-1px_0_0_0]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 498.162 1">
                <line id="Line 3" stroke="var(--stroke-0, #D3D7DA)" x2="498.162" y1="0.5" y2="0.5" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function StayConnectedTextContainer() {
  return (
    <div className="[word-break:break-word] content-stretch flex flex-col font-['29LT_Azer:Regular',sans-serif] gap-[5px] items-start leading-[normal] not-italic relative shrink-0 text-[20px] text-black w-[442px]" data-name="Stay Connected Text Container">
      <p className="relative shrink-0 w-full">{`STAY CONNECTED `}</p>
      <p className="relative shrink-0 w-full">Receive e-mail updates on our exhibitions, events, and more</p>
    </div>
  );
}

function EmailContainer() {
  return (
    <div className="absolute bg-white content-stretch flex items-center left-0 px-[20px] py-[10px] rounded-[100px] top-0 w-[506px]" data-name="Email Container">
      <div aria-hidden className="absolute border-2 border-[#243646] border-solid inset-0 pointer-events-none rounded-[100px]" />
      <p className="[word-break:break-word] font-['29LT_Azer:Regular',sans-serif] leading-[normal] not-italic opacity-50 relative shrink-0 text-[#243646] text-[18px] whitespace-nowrap">Email</p>
    </div>
  );
}

function SubscribeButtonContainer() {
  return (
    <div className="bg-[#243646] content-stretch flex items-center px-[30px] py-[10px] relative rounded-[100px] shrink-0" data-name="Subscribe Button Container">
      <div aria-hidden className="absolute border-2 border-[#243646] border-solid inset-0 pointer-events-none rounded-[100px]" />
      <p className="[word-break:break-word] font-['29LT_Azer:Regular',sans-serif] leading-[normal] not-italic relative shrink-0 text-[#d3d7da] text-[18px] whitespace-nowrap">Subscribe</p>
    </div>
  );
}

function SubscribeContainer() {
  return (
    <div className="content-stretch flex flex-col gap-[10px] h-[38px] items-end relative shrink-0 w-full" data-name="Subscribe Container">
      <EmailContainer />
      <SubscribeButtonContainer />
    </div>
  );
}

function StayConnectedContainer() {
  return (
    <div className="content-stretch flex flex-col gap-[21px] items-start relative shrink-0 w-[506px]" data-name="Stay Connected Container">
      <StayConnectedTextContainer />
      <SubscribeContainer />
    </div>
  );
}

function DubaiLogo() {
  return (
    <div className="h-[95.25px] relative shrink-0 w-[172.17px]" data-name="Dubai-logo 1">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 172.17 95.25">
        <g id="Dubai-logo 1">
          <path d={svgPaths.p19183c60} fill="var(--fill-0, #FBFBFB)" id="Vector" />
          <path d={svgPaths.p39320c0} fill="var(--fill-0, #FBFBFB)" id="Vector_2" />
          <path d={svgPaths.p1c149700} fill="var(--fill-0, #FBFBFB)" id="Vector_3" />
          <path d={svgPaths.p14a7a0e0} fill="var(--fill-0, #FBFBFB)" id="Vector_4" />
          <path d={svgPaths.p31172380} fill="var(--fill-0, #FBFBFB)" id="Vector_5" />
          <path d={svgPaths.p386f2e00} fill="var(--fill-0, #FBFBFB)" id="Vector_6" />
          <path d={svgPaths.p3425c2f0} fill="var(--fill-0, #FBFBFB)" id="Vector_7" />
          <path d={svgPaths.p56db700} fill="var(--fill-0, #FBFBFB)" id="Vector_8" />
          <path d={svgPaths.p15018100} fill="var(--fill-0, #FBFBFB)" id="Vector_9" />
          <path d={svgPaths.p65e95f0} fill="var(--fill-0, #FBFBFB)" id="Vector_10" />
          <path d={svgPaths.pce2e00} fill="var(--fill-0, #FBFBFB)" id="Vector_11" />
          <path d={svgPaths.pfe28600} fill="var(--fill-0, #FBFBFB)" id="Vector_12" />
          <path d={svgPaths.p3457680} fill="var(--fill-0, #FBFBFB)" id="Vector_13" />
          <path d={svgPaths.p3f737100} fill="var(--fill-0, #FBFBFB)" id="Vector_14" />
          <path d={svgPaths.p29364500} fill="var(--fill-0, #FBFBFB)" id="Vector_15" />
          <path d={svgPaths.p3b52eb00} fill="var(--fill-0, #FBFBFB)" id="Vector_16" />
          <path d={svgPaths.p2553980} fill="var(--fill-0, #FBFBFB)" id="Vector_17" />
          <path d={svgPaths.p2e11a630} fill="var(--fill-0, #FBFBFB)" id="Vector_18" />
          <path d={svgPaths.p3ceef00} fill="var(--fill-0, #FBFBFB)" id="Vector_19" />
          <path d={svgPaths.p2db33500} fill="var(--fill-0, #FBFBFB)" id="Vector_20" />
          <path d={svgPaths.p17038500} fill="var(--fill-0, #FBFBFB)" id="Vector_21" />
          <path d={svgPaths.p37c04400} fill="var(--fill-0, #FBFBFB)" id="Vector_22" />
          <path d={svgPaths.pa795180} fill="var(--fill-0, #FBFBFB)" id="Vector_23" />
          <path d={svgPaths.p27e74d00} fill="var(--fill-0, #FBFBFB)" id="Vector_24" />
          <path d={svgPaths.p828be00} fill="var(--fill-0, #FBFBFB)" id="Vector_25" />
          <path d={svgPaths.p12c425f0} fill="var(--fill-0, #FBFBFB)" id="Vector_26" />
          <path d={svgPaths.p48e2f00} fill="var(--fill-0, #FBFBFB)" id="Vector_27" />
          <path d={svgPaths.p206d9600} fill="var(--fill-0, #FBFBFB)" id="Vector_28" />
          <path d={svgPaths.p190d7e00} fill="var(--fill-0, #FBFBFB)" id="Vector_29" />
          <path d={svgPaths.p14630680} fill="var(--fill-0, #FBFBFB)" id="Vector_30" />
          <path d={svgPaths.p16976500} fill="var(--fill-0, #FBFBFB)" id="Vector_31" />
          <path d={svgPaths.p1f8cd00} fill="var(--fill-0, #FBFBFB)" id="Vector_32" />
          <path d={svgPaths.p2cb56e00} fill="var(--fill-0, #FBFBFB)" id="Vector_33" />
          <path d={svgPaths.p2e00c900} fill="var(--fill-0, #FBFBFB)" id="Vector_34" />
          <path d={svgPaths.p10017c00} fill="var(--fill-0, #FBFBFB)" id="Vector_35" />
          <path d={svgPaths.p19183c60} fill="var(--fill-0, #FBFBFB)" id="Vector_36" />
          <path d={svgPaths.p39320c0} fill="var(--fill-0, #FBFBFB)" id="Vector_37" />
          <path d={svgPaths.p1c149700} fill="var(--fill-0, #FBFBFB)" id="Vector_38" />
          <path d={svgPaths.p14a7a0e0} fill="var(--fill-0, #FBFBFB)" id="Vector_39" />
          <path d={svgPaths.p31172380} fill="var(--fill-0, #FBFBFB)" id="Vector_40" />
          <path d={svgPaths.p386f2e00} fill="var(--fill-0, #FBFBFB)" id="Vector_41" />
          <path d={svgPaths.p3425c2f0} fill="var(--fill-0, #FBFBFB)" id="Vector_42" />
          <path d={svgPaths.p56db700} fill="var(--fill-0, #FBFBFB)" id="Vector_43" />
          <path d={svgPaths.p15018100} fill="var(--fill-0, #FBFBFB)" id="Vector_44" />
          <path d={svgPaths.p65e95f0} fill="var(--fill-0, #FBFBFB)" id="Vector_45" />
          <path d={svgPaths.p3457680} fill="var(--fill-0, #FBFBFB)" id="Vector_46" />
          <path d={svgPaths.p2553980} fill="var(--fill-0, #FBFBFB)" id="Vector_47" />
          <path d={svgPaths.p3ceef00} fill="var(--fill-0, #FBFBFB)" id="Vector_48" />
          <path d={svgPaths.p2db33500} fill="var(--fill-0, #FBFBFB)" id="Vector_49" />
          <path d={svgPaths.p17038500} fill="var(--fill-0, #FBFBFB)" id="Vector_50" />
          <path d={svgPaths.p37c04400} fill="var(--fill-0, #FBFBFB)" id="Vector_51" />
          <path d={svgPaths.pa795180} fill="var(--fill-0, #FBFBFB)" id="Vector_52" />
          <path d={svgPaths.p27e74d00} fill="var(--fill-0, #FBFBFB)" id="Vector_53" />
          <path d={svgPaths.p828be00} fill="var(--fill-0, #FBFBFB)" id="Vector_54" />
          <path d={svgPaths.p12c425f0} fill="var(--fill-0, #FBFBFB)" id="Vector_55" />
          <path d={svgPaths.p48e2f00} fill="var(--fill-0, #FBFBFB)" id="Vector_56" />
          <path d={svgPaths.p206d9600} fill="var(--fill-0, #FBFBFB)" id="Vector_57" />
          <path d={svgPaths.p190d7e00} fill="var(--fill-0, #FBFBFB)" id="Vector_58" />
          <path d={svgPaths.p14630680} fill="var(--fill-0, #FBFBFB)" id="Vector_59" />
          <path d={svgPaths.p16976500} fill="var(--fill-0, #FBFBFB)" id="Vector_60" />
          <path d={svgPaths.p1f8cd00} fill="var(--fill-0, #FBFBFB)" id="Vector_61" />
          <path d={svgPaths.p2cb56e00} fill="var(--fill-0, #FBFBFB)" id="Vector_62" />
          <path d={svgPaths.p2e00c900} fill="var(--fill-0, #FBFBFB)" id="Vector_63" />
          <path d={svgPaths.p10017c00} fill="var(--fill-0, #FBFBFB)" id="Vector_64" />
        </g>
      </svg>
    </div>
  );
}

function ContactUsTextContainer() {
  return (
    <div className="[word-break:break-word] content-stretch flex flex-col font-['29LT_Azer:Regular',sans-serif] gap-[10px] items-start leading-[normal] not-italic relative shrink-0 text-[20px] text-black" data-name="Contact Us Text Container">
      <p className="relative shrink-0 whitespace-nowrap">CONTACT US</p>
      <p className="relative shrink-0 whitespace-pre">{`FAQs  |  Disclaimer  |  Terms of use  |  Privacy Policy `}</p>
      <p className="relative shrink-0 whitespace-pre">{`Contact Us  T​​e​l. ​80033​222​`}</p>
    </div>
  );
}

function ContactUsContainer() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Contact Us Container">
      <ContactUsTextContainer />
    </div>
  );
}

function FooterContainer() {
  return (
    <div className="absolute content-stretch flex gap-[155px] items-center left-[36px] top-[42px]" data-name="Footer Container">
      <StayConnectedContainer />
      <DubaiLogo />
      <ContactUsContainer />
    </div>
  );
}

function Footer() {
  return (
    <div className="absolute bg-[#bec3c7] bottom-0 h-[188px] left-0 overflow-clip right-0" data-name="Footer">
      <FooterContainer />
    </div>
  );
}

function Group() {
  return (
    <div className="absolute inset-[1.34%]" data-name="Group">
      <div className="absolute inset-[-10.04%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 78.155 78.155">
          <g filter="url(#filter0_d_1_1166)" id="Group">
            <g id="Group_2">
              <path d={svgPaths.p3a2c3c60} id="Vector" stroke="var(--stroke-0, #BEC3C7)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.79" />
              <path d={svgPaths.pbd94700} id="Vector_2" stroke="var(--stroke-0, #BEC3C7)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.79" />
            </g>
            <path d={svgPaths.p2ca31cf0} id="Vector_3" stroke="var(--stroke-0, #BEC3C7)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.79" />
          </g>
          <defs>
            <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="78.155" id="filter0_d_1_1166" width="78.155" x="2.38419e-07" y="2.38419e-07">
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
              <feOffset />
              <feGaussianBlur stdDeviation="2.82" />
              <feColorMatrix type="matrix" values="0 0 0 0 0.823529 0 0 0 0 0.823529 0 0 0 0 0.823529 0 0 0 0.75 0" />
              <feBlend in2="BackgroundImageFix" mode="normal" result="effect1_dropShadow_1_1166" />
              <feBlend in="SourceGraphic" in2="effect1_dropShadow_1_1166" mode="normal" result="shape" />
            </filter>
          </defs>
        </svg>
      </div>
    </div>
  );
}

function Untitled() {
  return (
    <div className="absolute left-[1255px] overflow-clip size-[66.88px] top-[575px]" data-name="Untitled-5 1">
      <Group />
    </div>
  );
}

function InstagramLogo() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="InstagramLogo">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="InstagramLogo">
          <path d={svgPaths.pce66b80} fill="var(--fill-0, #D3D7DA)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function FacebookLogo() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="FacebookLogo">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="FacebookLogo">
          <path d={svgPaths.p35437bc0} fill="var(--fill-0, #D3D7DA)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function TwitterLogo() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="TwitterLogo">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="TwitterLogo">
          <path d={svgPaths.pf548f80} fill="var(--fill-0, #D3D7DA)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function SocialIconsContainer() {
  return (
    <div className="-translate-x-1/2 absolute content-stretch flex flex-col gap-[10px] items-start left-[calc(50%+2px)] top-0 w-[24px]" data-name="Social Icons Container">
      <InstagramLogo />
      <FacebookLogo />
      <TwitterLogo />
    </div>
  );
}

function IconContainer() {
  return (
    <div className="h-[80px] relative shrink-0 w-[20px]" data-name="Icon Container">
      <SocialIconsContainer />
    </div>
  );
}

function SocialMediaContainer() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[40px] items-start left-[36px] top-[332px]" data-name="Social Media Container">
      <div className="flex h-[95px] items-center justify-center min-w-full relative shrink-0 w-[min-content]" style={{ containerType: "size" }}>
        <div className="-rotate-90 flex-none h-[100cqw]">
          <p className="[word-break:break-word] font-['29LT_Azer:Regular',sans-serif] h-full leading-[normal] not-italic relative text-[#d3d7da] text-[20px] w-[95px]">@alfahidifort</p>
        </div>
      </div>
      <IconContainer />
      <div className="flex h-[170px] items-center justify-center min-w-full relative shrink-0 w-[min-content]" style={{ containerType: "size" }}>
        <div className="-rotate-90 flex-none h-[100cqw]">
          <p className="[word-break:break-word] font-['29LT_Azer:Regular',sans-serif] h-full leading-[normal] not-italic relative text-[#d3d7da] text-[20px] w-[170px]">Find us on social media</p>
        </div>
      </div>
    </div>
  );
}

function HeroSection() {
  return (
    <div className="absolute h-[777px] left-0 right-0 top-0" data-name="Hero-section">
      <div className="absolute h-[777px] left-0 top-0 w-[1440px]" data-name="hero-banner 2">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgHeroBanner2.src} />
      </div>
      <div className="absolute h-[777px] left-0 top-0 w-[1440px]" data-name="Subtract">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1440 777">
          <path d={svgPaths.p8849df0} fill="var(--fill-0, #253646)" fillOpacity="0.8" id="Subtract" />
        </svg>
      </div>
      <Untitled />
      <div className="absolute h-[88px] left-[1392px] top-[80px] w-[11px]" data-name="Hero Image">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgHeroImage.src} />
      </div>
      <SocialMediaContainer />
      <div className="absolute flex h-[271px] items-center justify-center left-[724px] top-[61px] w-[324px]">
        <div className="flex-none rotate-[39.91deg]">
          <div className="h-0 relative w-[422.394px]">
            <div className="absolute inset-[-1px_0_0_0]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 422.394 1">
                <line id="Line 1" stroke="var(--stroke-0, #D3D7DA)" x2="422.394" y1="0.5" y2="0.5" />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute flex h-[395px] items-center justify-center left-[676px] top-[65px] w-[37px]">
        <div className="flex-none rotate-[95.35deg]">
          <div className="h-0 relative w-[396.729px]">
            <div className="absolute inset-[-1px_0_0_0]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 396.729 1">
                <line id="Line 2" stroke="var(--stroke-0, #D3D7DA)" x2="396.729" y1="0.5" y2="0.5" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function GovernmentOfDubai() {
  return (
    <div className="h-[48px] relative shrink-0 w-[112.25px]" data-name="Government-of-dubai 1">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 112.25 48">
        <g clipPath="url(#clip0_1_987)" id="Government-of-dubai 1">
          <path d={svgPaths.p197abb00} fill="var(--fill-0, #D3D7DA)" id="Vector" />
          <path d={svgPaths.pb333980} fill="var(--fill-0, #D3D7DA)" id="Vector_2" />
          <path d={svgPaths.p39425500} fill="var(--fill-0, #D3D7DA)" id="Vector_3" />
          <path d={svgPaths.p37f6d080} fill="var(--fill-0, #D3D7DA)" id="Vector_4" />
          <path d={svgPaths.p21f5bd00} fill="var(--fill-0, #D3D7DA)" id="Vector_5" />
          <path d={svgPaths.pa8a1900} fill="var(--fill-0, #D3D7DA)" id="Vector_6" />
          <path d={svgPaths.p20df9f00} fill="var(--fill-0, #D3D7DA)" id="Vector_7" />
          <path d={svgPaths.p7b79240} fill="var(--fill-0, #D3D7DA)" id="Vector_8" />
          <path d={svgPaths.p1ce8b0c0} fill="var(--fill-0, #D3D7DA)" id="Vector_9" />
          <path d={svgPaths.p3f75cf00} fill="var(--fill-0, #D3D7DA)" id="Vector_10" />
          <path d={svgPaths.p17511200} fill="var(--fill-0, #D3D7DA)" id="Vector_11" />
          <path d={svgPaths.p4a44c80} fill="var(--fill-0, #D3D7DA)" id="Vector_12" />
          <path d={svgPaths.p1fcfa600} fill="var(--fill-0, #D3D7DA)" id="Vector_13" />
          <path d={svgPaths.p17f9f700} fill="var(--fill-0, #D3D7DA)" id="Vector_14" />
          <path d={svgPaths.p12572980} fill="var(--fill-0, #D3D7DA)" id="Vector_15" />
          <path d={svgPaths.pf58e390} fill="var(--fill-0, #D3D7DA)" id="Vector_16" />
          <path d={svgPaths.p2f779d00} fill="var(--fill-0, #D3D7DA)" id="Vector_17" />
          <path d={svgPaths.p26e71440} fill="var(--fill-0, #D3D7DA)" id="Vector_18" />
          <path d={svgPaths.p249d4200} fill="var(--fill-0, #D3D7DA)" id="Vector_19" />
          <path d={svgPaths.p2337700} fill="var(--fill-0, #D3D7DA)" id="Vector_20" />
          <path d={svgPaths.p16dfaf40} fill="var(--fill-0, #D3D7DA)" id="Vector_21" />
          <path d={svgPaths.p1f223900} fill="var(--fill-0, #D3D7DA)" id="Vector_22" />
          <path d={svgPaths.p14b84b80} fill="var(--fill-0, #D3D7DA)" id="Vector_23" />
          <path d={svgPaths.p11cb6b00} fill="var(--fill-0, #D3D7DA)" id="Vector_24" />
          <path d={svgPaths.p10101780} fill="var(--fill-0, #D3D7DA)" id="Vector_25" />
          <path d={svgPaths.p16300040} fill="var(--fill-0, #D3D7DA)" id="Vector_26" />
          <path d={svgPaths.p11b880} fill="var(--fill-0, #D3D7DA)" id="Vector_27" />
          <path d={svgPaths.p1624a870} fill="var(--fill-0, #D3D7DA)" id="Vector_28" />
          <path d={svgPaths.p34210f80} fill="var(--fill-0, #D3D7DA)" id="Vector_29" />
          <path d={svgPaths.p29b10640} fill="var(--fill-0, #D3D7DA)" id="Vector_30" />
          <path d={svgPaths.p224f1c00} fill="var(--fill-0, #D3D7DA)" id="Vector_31" />
          <path d={svgPaths.p3b5ab600} fill="var(--fill-0, #D3D7DA)" id="Vector_32" />
          <path d={svgPaths.pcbd0bfc} fill="var(--fill-0, #D3D7DA)" id="Vector_33" />
          <path d={svgPaths.p32c50500} fill="var(--fill-0, #D3D7DA)" id="Vector_34" />
          <path d={svgPaths.p32e24a80} fill="var(--fill-0, #D3D7DA)" id="Vector_35" />
          <path d={svgPaths.p392cec80} fill="var(--fill-0, #D3D7DA)" id="Vector_36" />
          <path d={svgPaths.p197abb00} fill="var(--fill-0, #D3D7DA)" id="Vector_37" />
          <path d={svgPaths.pb333980} fill="var(--fill-0, #D3D7DA)" id="Vector_38" />
          <path d={svgPaths.p39425500} fill="var(--fill-0, #D3D7DA)" id="Vector_39" />
          <path d={svgPaths.p37f6d080} fill="var(--fill-0, #D3D7DA)" id="Vector_40" />
          <path d={svgPaths.p21f5bd00} fill="var(--fill-0, #D3D7DA)" id="Vector_41" />
          <path d={svgPaths.pa8a1900} fill="var(--fill-0, #D3D7DA)" id="Vector_42" />
          <path d={svgPaths.p20df9f00} fill="var(--fill-0, #D3D7DA)" id="Vector_43" />
          <path d={svgPaths.p7b79240} fill="var(--fill-0, #D3D7DA)" id="Vector_44" />
          <path d={svgPaths.p1ce8b0c0} fill="var(--fill-0, #D3D7DA)" id="Vector_45" />
          <path d={svgPaths.p3f75cf00} fill="var(--fill-0, #D3D7DA)" id="Vector_46" />
          <path d={svgPaths.p17511200} fill="var(--fill-0, #D3D7DA)" id="Vector_47" />
          <path d={svgPaths.p4a44c80} fill="var(--fill-0, #D3D7DA)" id="Vector_48" />
          <path d={svgPaths.p1fcfa600} fill="var(--fill-0, #D3D7DA)" id="Vector_49" />
          <path d={svgPaths.p17f9f700} fill="var(--fill-0, #D3D7DA)" id="Vector_50" />
          <path d={svgPaths.p12572980} fill="var(--fill-0, #D3D7DA)" id="Vector_51" />
          <path d={svgPaths.pf58e390} fill="var(--fill-0, #D3D7DA)" id="Vector_52" />
          <path d={svgPaths.p2f779d00} fill="var(--fill-0, #D3D7DA)" id="Vector_53" />
          <path d={svgPaths.p26e71440} fill="var(--fill-0, #D3D7DA)" id="Vector_54" />
          <path d={svgPaths.p249d4200} fill="var(--fill-0, #D3D7DA)" id="Vector_55" />
          <path d={svgPaths.p2337700} fill="var(--fill-0, #D3D7DA)" id="Vector_56" />
          <path d={svgPaths.p16dfaf40} fill="var(--fill-0, #D3D7DA)" id="Vector_57" />
          <path d={svgPaths.p1f223900} fill="var(--fill-0, #D3D7DA)" id="Vector_58" />
          <path d={svgPaths.p14b84b80} fill="var(--fill-0, #D3D7DA)" id="Vector_59" />
          <path d={svgPaths.p11cb6b00} fill="var(--fill-0, #D3D7DA)" id="Vector_60" />
          <path d={svgPaths.p10101780} fill="var(--fill-0, #D3D7DA)" id="Vector_61" />
          <path d={svgPaths.p16300040} fill="var(--fill-0, #D3D7DA)" id="Vector_62" />
          <path d={svgPaths.p11b880} fill="var(--fill-0, #D3D7DA)" id="Vector_63" />
          <path d={svgPaths.p1624a870} fill="var(--fill-0, #D3D7DA)" id="Vector_64" />
          <path d={svgPaths.p34210f80} fill="var(--fill-0, #D3D7DA)" id="Vector_65" />
          <path d={svgPaths.p29b10640} fill="var(--fill-0, #D3D7DA)" id="Vector_66" />
          <path d={svgPaths.p224f1c00} fill="var(--fill-0, #D3D7DA)" id="Vector_67" />
          <path d={svgPaths.p3b5ab600} fill="var(--fill-0, #D3D7DA)" id="Vector_68" />
          <path d={svgPaths.pcbd0bfc} fill="var(--fill-0, #D3D7DA)" id="Vector_69" />
          <path d={svgPaths.p32c50500} fill="var(--fill-0, #D3D7DA)" id="Vector_70" />
          <path d={svgPaths.p32e24a80} fill="var(--fill-0, #D3D7DA)" id="Vector_71" />
          <path d={svgPaths.p392cec80} fill="var(--fill-0, #D3D7DA)" id="Vector_72" />
        </g>
        <defs>
          <clipPath id="clip0_1_987">
            <rect fill="white" height="48" width="112.25" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Frame() {
  return (
    <div className="content-stretch flex items-center justify-center px-[10px] py-[5px] relative rounded-[100px] shrink-0">
      <div aria-hidden className="absolute border border-[#d3d7da] border-solid inset-0 pointer-events-none rounded-[100px]" />
      <p className="[word-break:break-word] font-['29LT_Azer:Regular',sans-serif] leading-[normal] not-italic relative shrink-0 text-[#d3d7da] text-[26px] whitespace-nowrap">Book Tickets</p>
    </div>
  );
}

function Frame2() {
  return (
    <div className="content-stretch flex gap-[30px] items-end relative shrink-0">
      <GovernmentOfDubai />
      <Frame />
    </div>
  );
}

function Frame1() {
  return (
    <div className="content-stretch flex gap-[20px] items-center relative shrink-0">
      <p className="[word-break:break-word] font-['29LT_Azer:Regular',sans-serif] leading-[normal] not-italic relative shrink-0 text-[#d3d7da] text-[26px] whitespace-nowrap" dir="auto">
        العربية
      </p>
      <div className="bg-[#d3d7da] h-[32px] relative shrink-0 w-[2px]" />
      <div className="relative shrink-0 size-[12px]" data-name="Vector">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
          <path d={svgPaths.p18594e00} fill="var(--fill-0, #D3D7DA)" id="Vector" stroke="var(--stroke-0, #D3D7DA)" />
        </svg>
      </div>
    </div>
  );
}

function Frame3() {
  return (
    <div className="content-stretch flex gap-[30px] items-end relative shrink-0">
      <Frame2 />
      <Frame1 />
    </div>
  );
}

function Frame6() {
  return (
    <div className="content-stretch flex gap-[75px] items-end relative shrink-0">
      <Frame3 />
      <p className="[word-break:break-word] font-['29LT_Azer:Regular',sans-serif] leading-[normal] not-italic relative shrink-0 text-[#d3d7da] text-[26px] whitespace-nowrap">Experience</p>
    </div>
  );
}

function AlFahidiFortEmblemGreyLight() {
  return (
    <div className="h-[59px] relative shrink-0 w-[36px]" data-name="Al Fahidi Fort_Emblem_GREY_light 1">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 36 59">
        <g clipPath="url(#clip0_1_979)" id="Al Fahidi Fort_Emblem_GREY_light 1">
          <path d={svgPaths.pc43c700} fill="var(--fill-0, #E0E0E0)" id="Vector" />
          <path d={svgPaths.p1ff74880} fill="var(--fill-0, #E0E0E0)" id="Vector_2" />
          <path d={svgPaths.p12623b00} fill="var(--fill-0, #E0E0E0)" id="Vector_3" />
          <path d={svgPaths.p1baffc80} fill="var(--fill-0, #E0E0E0)" id="Vector_4" />
        </g>
        <defs>
          <clipPath id="clip0_1_979">
            <rect fill="white" height="59" width="36" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Frame4() {
  return (
    <div className="[word-break:break-word] content-stretch flex font-['29LT_Azer:Regular',sans-serif] gap-[20px] items-center leading-[normal] not-italic relative shrink-0 text-[#d3d7da] text-[26px] whitespace-nowrap">
      <p className="relative shrink-0">Plan Your Visit</p>
      <p className="relative shrink-0">FAQ</p>
      <p className="relative shrink-0">Contact Us</p>
    </div>
  );
}

function Logo() {
  return (
    <div className="h-[51.93px] relative shrink-0 w-[234.78px]" data-name="logo 1">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 234.78 51.93">
        <g clipPath="url(#clip0_1_1139)" id="logo 1">
          <path d={svgPaths.padb1d40} fill="var(--fill-0, #D3D7DA)" id="Vector" />
          <path d={svgPaths.p3cb23100} fill="var(--fill-0, #D3D7DA)" id="Vector_2" />
          <path d={svgPaths.p5a27800} fill="var(--fill-0, #D3D7DA)" id="Vector_3" />
          <path d={svgPaths.p10274f00} fill="var(--fill-0, #D3D7DA)" id="Vector_4" />
          <path d={svgPaths.p27543180} fill="var(--fill-0, #D3D7DA)" id="Vector_5" />
          <path d={svgPaths.p2d8aaa00} fill="var(--fill-0, #D3D7DA)" id="Vector_6" />
          <path d={svgPaths.p3d517000} fill="var(--fill-0, #D3D7DA)" id="Vector_7" />
          <path d={svgPaths.pbb37270} fill="var(--fill-0, #D3D7DA)" id="Vector_8" />
          <path d={svgPaths.p36259df0} fill="var(--fill-0, #D3D7DA)" id="Vector_9" />
          <path d={svgPaths.p80e5200} fill="var(--fill-0, #D3D7DA)" id="Vector_10" />
        </g>
        <defs>
          <clipPath id="clip0_1_1139">
            <rect fill="white" height="51.93" width="234.78" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Frame5() {
  return (
    <div className="content-stretch flex gap-[20px] items-end relative shrink-0">
      <Frame4 />
      <Logo />
    </div>
  );
}

export default function Home() {
  return (
    <div className="bg-white relative size-full" data-name="Home">
      <div className="-translate-x-1/2 absolute bg-[#795135] h-[50px] left-1/2 overflow-clip rounded-[100px] top-[797px] w-[1368px]" data-name="Marquee">
        <p className="[word-break:break-word] absolute font-['29LT_Azer:Regular',sans-serif] leading-[normal] left-[10px] not-italic text-[30px] text-white top-[10px] whitespace-pre">{`DUBAI FREE PORT EXBHITION UNTIL 29TH JANUARY    OPEN TODAY: 10:30 AM – 6 PM    MORE EVENTS ON SUNDAY   DUBAI FREE PORT `}</p>
      </div>
      <HorizontalExhibitionContainer />
      <VerticalExhibitionsContainer />
      <HorizontalExhibitionContainer1 />
      <ExhibitionGuidedTour />
      <Footer />
      <HeroSection />
      <div className="-translate-x-1/2 absolute content-stretch flex gap-[67px] items-start left-1/2 px-[36px] py-[24px] top-0 w-[1440px]">
        <Frame6 />
        <AlFahidiFortEmblemGreyLight />
        <Frame5 />
      </div>
    </div>
  );
}
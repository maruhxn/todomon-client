export default function MainParagraph() {
  return (
    <div className="mx-auto text-center flex-grow flex flex-col items-center justify-center px-4 py-8 space-y-8">
      <h1 className="text-4xl md:text-6xl font-bold mb-4 font-heading flex flex-col -space-y-12">
        <span>매일의 작은 목표로,</span>
        <br />
        <span className="text-green-500">당신과 펫이 함께 성장합니다.</span>
      </h1>
      <p className="text-xl font-body">
        목표 달성의 재미와 친구들과의 경쟁, 그리고 펫을 돌보는 즐거움을 한 번에!
      </p>
    </div>
  );
}

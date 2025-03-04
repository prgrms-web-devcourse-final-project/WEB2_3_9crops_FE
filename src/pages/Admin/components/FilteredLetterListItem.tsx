import { KebobMenuIcon } from '@/assets/icons';
// import MenuModal from "./MenuModal";

export default function FilteredLetterListItem() {
  return (
    <div
      className="hover:bg-primary-4 relative flex cursor-pointer justify-between border-b bg-white px-6 py-4"
      onClick={() => {}}
    >
      <div className="flex h-full w-[80%] items-center">
        <span className="admin-list-set basis-1/10">{'더미'}</span>
        <span className="admin-list-set basis-2/10">{'더미'}</span>
        <span className="admin-list-set basis-2/10">{'더미'}</span>
        <span className="admin-list-set basis-2/10">{'더미'}</span>
        <span className="admin-list-set basis-2/10">{'더미'}</span>
      </div>
      <button onClick={() => {}}>
        <KebobMenuIcon className="h-5 w-5" />
      </button>
      {/* {modalOpen && <MenuModal modalContents={modalContents} setModalOpen={setModalOpen} />} */}
    </div>
  );
}

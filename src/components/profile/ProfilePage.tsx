import MyWishes from "./MyWishes";
import ProfileHeader from "./ProfileHeader";

export default function ProfilePage() {
  return (
    <div className="h-full pt-14 md:px-20">
      <ProfileHeader />
      <MyWishes />
    </div>
  );
}

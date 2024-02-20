import { MobileSidebar } from './mobile-sidebar';

export const Header = () => {
  return (
    <header className="p-6 flex">
      <MobileSidebar />
      <h1>Dashboard</h1>
    </header>
  );
};

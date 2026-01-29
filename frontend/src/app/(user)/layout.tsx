import "../globals.css";
import Navigation from "@/component/layout/Navigation";
import Container from "@/component/ui/Container";

export default async function userLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navigation />
      <Container>{children}</Container>
    </>
  );
}

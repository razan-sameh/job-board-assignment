import { Briefcase, FileText } from "lucide-react";
import Link from "next/link";
import Container from "../ui/Container";

function Navigation() {
  return (
    <Container>
      <div className="flex gap-1 py-4">
        {/* Browse Jobs Button */}
        <Link
          href={"/jobs"}
          className="px-6 py-2.5 bg-primary text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2"
        >
          <Briefcase className="w-4 h-4" />
          Browse Jobs
        </Link>

        {/* My Applications Button */}
        <Link
          href={"/applications"}
          className="px-6 py-2.5 text-content rounded-xl font-semibold border border-lightGray hover:bg-lightGray/20 transition-all duration-300 flex items-center gap-2"
        >
          <FileText className="w-4 h-4" />
          My Applications
        </Link>
      </div>
    </Container>
  );
}

export default Navigation;

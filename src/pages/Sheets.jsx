import PageIntro from "../components/layout/PageIntro";
import PageShell from "../components/layout/PageShell";
import ScoreViewer from "../components/music/ScoreViewer";

export default function Sheets() {
    return (
        <PageShell>
            <PageIntro title="Sheets" description="Here will be a hub of all course material, made interactive and playable"/>
            <ScoreViewer />
        </PageShell>
    )
}
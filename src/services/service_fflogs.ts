import { RaidAction, set_raid_actions } from "@/stores/timeline";

export function parse_fflog_url(url: string) {
    const url_split = url.split('/');
    const report_id = url_split[url_split.length - 1].split('#')[0];
    const fight_id = url_split[url_split.length - 1].split('#')[1].split('=')[1].split('&')[0];
    return { report_id, fight_id };
}

export function process_fflog_url(url: string) {
    const { report_id, fight_id } = parse_fflog_url(url);
    const service_url = new URL("https://ffxiv-timeline-api.shuttleapp.rs/boss_abilities"); 
    service_url.searchParams.append('report_id', report_id);
    service_url.searchParams.append('fight_id', fight_id);
    fetch(service_url.toString()).then(async (response) => {
        const data: RaidAction[] = await response.json();
        set_raid_actions(data);
    });
}
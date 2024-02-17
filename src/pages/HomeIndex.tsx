import { router } from "@/router";
import { Button } from "antd";
import { CSSProperties } from "react";


const style: CSSProperties = {
    height: "100vh",
    display: 'flex',
    alignItems: "center",
    justifyContent: "center"
}

export default function HomeIndex() {
    return (
        <div style={style}>
            <Button type="primary" onClick={() => router.navigate("/admin")}>Admin站点</Button>
        </div>
    )
}

import React from 'react';
import { Breadcrumb, BreadcrumbItem, Table } from 'reactstrap';
import { Link } from 'react-router-dom';

// todo - Start to modify the code to updated to ip server
//{"name": "软件","url": "https://www.sojson.com","publishTime": "20200818","info": "更新什么东西"}
function RenderDownloads({ download }) {
	return (
		<tr>
			<th scope="row">{download.name}</th>
			<td>{download.publishTime}</td>
			<td>{download.info}</td>
			<Link to={download.url} target="_blank">
				<td>{download.url}</td>
			</Link>
		</tr>
	);
}

const Downloading = (props) => {
	const singleDownload = props.downloads.downloads.map((download) => {
		return <RenderDownloads download={download} />;
	});

	return (
		<div className="container">
			<div className="row">
				<Breadcrumb>
					<BreadcrumbItem>
						<Link to="/">主页</Link>
					</BreadcrumbItem>
					<BreadcrumbItem active>下载汇总</BreadcrumbItem>
				</Breadcrumb>
				<div className="col-12">
					<h3>下载汇总</h3>
					<hr />
				</div>
			</div>
			<div className="row">
				<Table>
					<thead>
						<th>名称</th>
						<th>发布时间</th>
						<th>更新内容</th>
						<th>下载地址</th>
					</thead>
					<tbody>{singleDownload}</tbody>
				</Table>
			</div>
		</div>
	);
};

export default Downloading;

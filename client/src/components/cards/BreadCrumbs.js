import React from 'react'
import { Link } from "react-router-dom";
import { Breadcrumb } from 'antd';

function BreadCrumbs({product}) {
    const {title, subs, category} = product;
    return (
        <>
        <Breadcrumb className="pt-4">
            <Breadcrumb.Item><a href="/">Home</a></Breadcrumb.Item>
            <Breadcrumb.Item>
            {category && (<a href={`/category/${category.slug}`}>{category && (category.name)}</a>)}
            </Breadcrumb.Item>
            <Breadcrumb.Item>{subs && (subs.map((s) => (
            <Link
              key={s._id}
              to={`/sub/${s.slug}`}
            >
              {s.name}{" "}
            </Link>
          )))}
            </Breadcrumb.Item>
            <Breadcrumb.Item>{title}</Breadcrumb.Item>
        </Breadcrumb>
        </>
    )
}

export default BreadCrumbs
